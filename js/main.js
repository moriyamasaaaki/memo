'use strict';

(function() {

  var formtext = document.getElementById('formtext');
  var label   = document.getElementById('label');
  var ptsh = document.getElementById('save');

  // 文字数カウント
  var MATH = 0;

  label.textContent = MATH;
  sentences.addEventListener('keyup', function() {
    var remaining = MATH + this.value.length;
    label.textContent = remaining;
  });

  })();


      $(document).ready(function() {
        /** 登録ボタンクリック */
        $('#save').click(function() {
          var time = new Date().getTime();
          var data = new Object();
          data.title = $('#title').val();
          data.sentences = $('#sentences').val();
          var str = JSON.stringify(data);
          //ローカルストレージ
          if ((data.title == null || data.title == "") || ( data.sentences == null || data.sentences == "")) {
            alert("テキストを入力して下さい。");
              return;
          }
          localStorage.setItem(time, str);
          alert("保存しました。");
          loadStorage();
        });

        /** データクリアボタンクリック */
        $('#delete').click(function() {
          localStorage.clear();
          alert("全てのメモを消去しました。");
          loadStorage();
        });

        /** ローカルストレージデータ読み込み */
        function loadStorage() {
          $("#list tbody").empty();
          var rec = "";
          for (var i=0; i<localStorage.length; i++) {
            var key = localStorage.key(i); //keyを取得
            var value = localStorage.getItem(key); //keyからJSON文字列を取得
            if (!value) {
              continue;
            }
            try {
              var data = JSON.parse(value); //JSONオブジェクトに変換
            } catch (event) {
              continue;
            }
            var date = new Date();
      date.setTime(key);
      var dateStr = date.toDateString() + " " + date.toLocaleTimeString();
      rec += "<tr id='" + key + "'><td><button class='delete' href='#'>delete</button></td>";
      rec += "<td>" + data.title + "</td>";
      rec += "<td>" + data.sentences + "</td>";
      rec += "<td><time datetime='" + dateStr + "'>" + dateStr + "</time></td>";
      rec += "</tr>";
      }
      $("#list tbody").append(rec);
      $('.delete').bind('click', delete_clickHandler);
      }

      /** 削除処理 */
      function delete_clickHandler(event) {
      var target = $(event.target).parents('tr').attr('id');
      localStorage.removeItem(target);
      alert('メモを削除しました。');
      loadStorage();
      }
      //登録済みデータ読み込み
      loadStorage();
      });
