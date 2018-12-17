const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post Model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

//Validation

const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

// @route   GET api/posts
// @desc    Get post
// @access  Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res
        .status(404)
        .json({ nopostfound: "No post found with id: " + req.params.id });
    });
});

// @route   POST api/posts
// @desc    Create post
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      //If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   Delete api/posts/:id
// @desc    Delete post
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({
            notAuthorised:
              "User is not authorised to remove post: " + req.params.id
          });
        }
        post
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check if user is logged in
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        //Return error if user is not signed in to account
        return res.status(400).json({ unAuthorised: "User has not signed in" });
      }
      //find the post using URI Parameter
      Post.findById(req.params.id)
        .then(post => {
          if (!post) {
            //If not found return 404 error
            return res.status(404).json({
              nopost: "No post with id " + req.params.id + " has been found"
            });
          }
          if (
            //check if specified post contains a like from user
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            //if the user has previously liked this post, the ike will be removed
            post.likes.shift({ user: req.user.id });
            post.save();
            return res.status(400).json({
              alreadyliked:
                "User has already liked this post, like has been removed"
            });
          }
          //else it will add the user to the array of likes
          post.likes.unshift({ user: req.user.id });
          post.save();
          return res.json({
            liked: "User has liked this post."
          });

          //check to see if user exists in the lies array, (-1) if not, otherwise index.
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Comment on post
// @access  Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    //Check if user is logged in
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          //Return error if user is not signed in to account
          return res
            .status(400)
            .json({ Unauthorised: "User has not signed in" });
        }
        //find the post using URI Parameter
        Post.findById(req.params.id)
          .then(post => {
            const newComment = {
              text: req.body.text,
              name: req.user.name,
              avatar: req.user.avatar,
              user: req.user.id
            };

            // Add to comments array
            post.comments.unshift(newComment);

            // Save
            post.save().then(post => res.json(post));
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found", err })
          );
      })
      .catch(ProfileErr => {
        res.status(400).json({ unauthorised: "User has not signed in" });
      });
  }
);

// @route   Delete api/posts/comment/:id/:commentId
// @desc    Delete own comment on post
// @access  Private

router.delete(
  "/comment/:id/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check if user is logged in
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          //Return error if user is not signed in to account
          return res
            .status(400)
            .json({ Unauthorised: "User has not signed in" });
        }
        //find the post using URI Parameter
        Post.findById(req.params.id)
          .then(post => {
            //Obtain commentIndex by first mapping comments array to a id array and selecting index of parameter commentId
            const CommentIndex = post.comments
              .map(comment => comment._id.toString())
              .indexOf(req.params.commentId);
            //if user id == the comment array elements user id, then delete it.
            if (req.user.id.toString() == post.comments[CommentIndex].user) {
              post.comments.splice(CommentIndex, 1);
              post.save().then(post => res.json(post));
              //else return unauthorised.
            } else {
              return res
                .status(400)
                .json({ unauthorised: "Not authorised to delete post." });
            }
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found", err })
          );
      })
      .catch(ProfileErr => {
        res.status(400).json({ unauthorised: "User has not signed in" });
      });
  }
);
module.exports = router;
