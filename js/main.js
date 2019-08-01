'use strict';

(function() {
  const formtext = document.getElementById('formtext');
  const label = document.getElementById('label');
  const ptsh = document.getElementById('save');

  // 文字数カウント
  const MATH = 0;

  label.textContent = MATH;
  sentences.addEventListener('keyup', function() {
    const remaining = MATH + this.value.length;
    label.textContent = remaining;
  });
})();

$(document).ready(function() {
  /** 登録ボタンクリック */
  $('#save').click(function() {
    const time = new Date().getTime();
    const data = new Object();
    data.title = $('#title').val();
    data.sentences = $('#sentences').val();
    const str = JSON.stringify(data);
    // ローカルストレージ
    if ((data.title == null || data.title == '') || ( data.sentences == null || data.sentences == '')) {
      alert('テキストを入力して下さい。');
      return;
    }
    localStorage.setItem(time, str);
    alert('保存しました。');
    title.value = '';
    sentences.value = '';
    loadStorage();
  });

  /** データクリアボタンクリック */
  $('#delete').click(function() {
    localStorage.clear();
    alert('全てのメモを消去しました。');
    loadStorage();
  });

  /** ローカルストレージデータ読み込み */
  function loadStorage() {
    $('#list tbody').empty();
    const recs = [];
    let formatedRecs = [];
    for (let i=0; i<localStorage.length; i++) {
      let rec = '';
      const key = localStorage.key(i); // keyを取得
      const value = localStorage.getItem(key); // keyからJSON文字列を取得
      let data;
      if (!value) {
        continue;
      }
      try {
        data = JSON.parse(value); // JSONオブジェクトに変換
      } catch (event) {
        continue;
      }
      const date = new Date();
      date.setTime(key);
      const dateStr = date.toDateString() + ' ' + date.toLocaleTimeString();

      rec += '<tr id=\'' + key + '\'><td><button class=\'delete\' href=\'#\'>delete</button></td>';
      rec += '<td>' + data.title + '</td>';
      rec += '<td>' + data.sentences + '</td>';
      rec += '<td><time datetime=\'' + dateStr + '\'>' + dateStr + '</time></td>';
      rec += '</tr>';

      recs.push({
        date: dateStr,
        data: rec,
      });
      console.log(recs);
    }

    formatedRecs = recs.sort((x, y)=> {
      return x.date > y.date ? 1 : -1;
    }).map((rec) => {
      return rec.data;
    }).join('');

    // console.log(recs.sort((x, y)=> {
    //   x.date < y.date ? 1 : -1;
    // }));


    // formatedRecs = formatedRecs.map((rec)=>{
    //   rec.data;
    // }).join('');

    console.log(formatedRecs);


    $('#list tbody').append(formatedRecs);
    $('.delete').bind('click', deleteClickHandler);
  }

  // 削除処理
  function deleteClickHandler(event) {
    const target = $(event.target).parents('tr').attr('id');
    localStorage.removeItem(target);
    alert('メモを削除しました。');
    loadStorage();
  }

  // 登録済みデータ読み込み
  loadStorage();
});
Collapse;


