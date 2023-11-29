/**
 * The program content.js is released under the MIT license.
 * See https://opensource.org/licenses/MIT
 *
 * @author tetraloba
 */

const options = {
    childList: true,
    attributes: true,
    subtree: true,
}
function callback_game(mutationsList, observer) {
    const sentenceText = typing_content.contentWindow.document.getElementById('sentenceText');
    if (sentenceText) {
        const text2enter = sentenceText.children[0].children[1];
        if (text2enter && text2enter.textContent.length != char_left_num) { // 文字入力以外による画面更新時は実行しない
            char_left_num = text2enter.textContent.length;
            console.log(text2enter.textContent[0]); // ここがキーイベント送信。
        }
    }
}
function callback_body(mutationsList, observer) {
    console.log('callback_body(): 関数が実行されました');
    typing_content = document.getElementById('typing_content'); // ゲームのウィンドウ(iframe)
    if (typing_content) {
        app = typing_content.contentWindow.document.getElementById('app');
        if (app) {
            console.log('callback_body(): ゲーム画面の監視を開始します');
            flag_retry = 1;
            obs_game.observe(app, options);
        }
    }
}

/* main */
let app; // ゲーム
let typing_content;
let flag_retry; // ゲーム開始(及びリトライ)時に1, 終了時に0
let char_left_num = 0; // 残りの入力文字数
const obs_body = new MutationObserver(callback_body);
const obs_game = new MutationObserver(callback_game);
const target = document.body;
if (!target) {
    console.error('bodyの取得に失敗しました');
}
console.log('test: bodyの監視を開始します');
obs_body.observe(target, options);
console.log('test: scriptの最終行です');