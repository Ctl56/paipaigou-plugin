const extensionName = 'paipaigou-plugin';
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

// 必须要有这个酒馆官方的开机口令，否则插件会被静音！
export async function init() {
    console.log("【排排狗】插件已收到开机指令，开始启动！");

    // 1. 注入排排狗弹窗 (如果不存在的话)
    if (!document.getElementById('paipai-modal')) {
        const modalHtml = `
            <div id="paipai-modal" style="display:none; position:fixed; top:5%; left:5%; width:90%; height:90%; z-index:999999; background:#fff; border-radius:12px; box-shadow:0 0 20px rgba(0,0,0,0.5); overflow:hidden;">
                <div style="background:#f4eff0; padding:10px 15px; border-bottom:1px solid #d8cdd0; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:bold; color:#5a5052;">排排狗工具箱</span>
                    <button id="paipai-close-btn" style="color:#e11d48; font-weight:bold; cursor:pointer; background:none; border:none; font-size:15px; padding:5px 10px;">关闭 ✖</button>
                </div>
                <iframe id="paipai-iframe" src="${extensionFolderPath}/index.html" style="width:100%; height:calc(100% - 40px); border:none;"></iframe>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // 2. 注入 🐶 悬浮球 (如果不存在的话)
    if (!document.getElementById('paipai-fixed-btn')) {
        const btnHtml = `
            <button id="paipai-fixed-btn" style="position:fixed; bottom:130px; right:15px; z-index:99999; background:#d8cdd0; border:none; width:50px; height:50px; border-radius:50%; font-size:24px; box-shadow:0 4px 12px rgba(0,0,0,0.3); opacity:0.8; display:flex; justify-content:center; align-items:center; cursor:pointer;">
                🐶
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', btnHtml);
    }

    // 3. 绑定点击狗头事件
    document.getElementById('paipai-fixed-btn').addEventListener('click', () => {
        // 抓取屏幕上正在被选中的文字
        let selectedText = window.getSelection().toString().trim();
        
        // 弹出排排狗
        document.getElementById('paipai-modal').style.display = 'block';
        
        // 延迟一下等网页加载，然后把字丢进去
        setTimeout(() => {
            const iframe = document.getElementById('paipai-iframe');
            if (iframe && iframe.contentWindow && selectedText) {
                iframe.contentWindow.postMessage({ 
                    type: 'PaiPai_SendText', 
                    text: selectedText 
                }, '*');
                // 取消手机屏幕的高亮
                window.getSelection().removeAllRanges();
            }
        }, 800);
    });

    // 4. 绑定关闭按钮
    document.getElementById('paipai-close-btn').addEventListener('click', () => {
        document.getElementById('paipai-modal').style.display = 'none';
    });
}
