// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
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