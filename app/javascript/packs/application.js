// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// require("trix")
// require("@rails/actiontext")

import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

// いいねの表示ONOFF
const handleHeartDisplay = (hasLiked) => {
    if (hasLiked) {
      $('.active-heart').removeClass('hidden')
      console.log('acactive')
    } else {
      $('.inactive-heart').removeClass('hidden')
      console.log('inactive')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#comment-show').data()
    const postId = dataset.postId

    axios.get(`/posts/${postId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        $('.comments-container').append(
          `<div class="post_comment"><p>${comment.content}</p></div>`
        )
      })
    })

    $('.show-comment-form').on('click', () => {
      $('.show-comment-form').addClass('hidden')
      $('.comment-text-area').removeClass('hidden')
    })

    $('.add-comment-button').on('click', () => {
      const content = $('#comment_content').val()
      if (!content) {
        window.alert('コメントを入力してください')
      } else {
        axios.post(`/posts/${postId}/comments`, {
          comment: {content: content}
        })
          .then((res) => {
            const comment = res.data
            $('.comments-container').append(
              `<div class="post_comment"><p>${comment.content}</p></div>`
            )
            $('#comment_content').val('')
        })
      }
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#post-show').data()
    const postId = dataset.postId

    axios.get(`/posts/${postId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        $('.comments-container').append(
          `<div class="post_comment"><p>${comment.content}</p></div>`
        )
      })
    })

    $('.show-comment-form').on('click', () => {
      $('.show-comment-form').addClass('hidden')
      $('.comment-text-area').removeClass('hidden')
    })

    $('.add-comment-button').on('click', () => {
      const content = $('#comment_content').val()
      if (!content) {
        window.alert('コメントを入力してください')
      } else {
        axios.post(`/posts/${postId}/comments`, {
          comment: {content: content}
        })
          .then((res) => {
            const comment = res.data
            $('.comments-container').append(
              `<div class="post_comment"><p>${comment.content}</p></div>`
            )
            $('#comment_content').val('')
        })
      }
    })

    axios.get(`/posts/${postId}/like`)
      .then((response) => {
        const hasLiked = response.data.hasLiked
        handleHeartDisplay(hasLiked)
    })

    $('.inactive-heart').on('click', () => {
        axios.post(`/posts/${postId}/like`)
          .then((response) => {
            console.log(response)
            if (response.data.status === 'ok') {
              $('.active-heart').removeClass('hidden')
              $('.inactive-heart').addClass('hidden')
            }
          })
          .catch((e) => {
            window.alert('Error')
            console.log(e)
          })
    })

    $('.active-heart').on('click', () => {
        axios.delete(`/posts/${postId}/like`)
          .then((response) => {
            console.log(response)
            if (response.data.status === 'ok') {
              $('.active-heart').addClass('hidden')
              $('.inactive-heart').removeClass('hidden')
            }
          })
          .catch((e) => {
            window.alert('Error')
            console.log(e)
          })
    })
})


// $(function() {
// document.addEventListener('DOMContentLoaded', () => {
//     $('.show_title').on('click', function() {
//       window.alert("Clicked!");
//     //   $("#image_selector").trigger('click');
//     });
// });

$(function() {
    // プロフィール画像をクリックしたら、ファイル選択ダイアログを開く
    $("#profile_image").on('click', function() {
        $("#image_selector").trigger('click');
    });

    // 新しい画像を選択したら、その画像をプレビューとして表示し、サーバーにアップロードする
    $("#image_selector").on('change', function(e) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // 選択した画像をプレビューとして表示
            $("#profile_image").attr("src", e.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    });

    $("#sava_button").on('click', function() {
        // 画像をサーバーにアップロード
        var formData = new FormData();
        formData.append("avatar", $("#image_selector")[0].files[0]);
        $.ajax({
            url: "/profiles/update", // ここに画像をアップロードするためのURLを指定
            type: "PUT",
            data: formData,
            processData: false,
            contentType: false,
            success: function() {
                alert("Profile image updated successfully.");
            },
            error: function() {
                alert("Failed to update profile image.");
            }
        });
    });
});

// Ver1.0
// $(function() {
//     $("#profile_image").on('click', function() {
//       $("#image_selector").trigger('click');
//     });
  
//     $("#image_selector").on('change', function(e) {
//       var reader = new FileReader();
//       reader.onload = function(e) {
//         $("#profile_image").attr("src", e.target.result);
//         $("#save_button").show();
//       }
//       reader.readAsDataURL(e.target.files[0]);
//     });
  
//     $("#save_button").on('click', function() {
//       var formData = new FormData();
//       formData.append("avatar", $("#image_selector")[0].files[0]);
//       $.ajax({
//         url: "/profiles/" + profileId + "/update_avatar", //"/update_profile_image", //ここに画像をアップロードするためのURLを指定
//         type: "POST",
//         data: formData,
//         processData: false,
//         contentType: false,
//         success: function() {
//           alert("Profile image updated successfully.");
//         },
//         error: function() {
//           alert("Failed to update profile image.");
//         }
//       });
//     });
//   });

