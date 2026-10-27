// 1. 创建狗头悬浮球
const btn = document.createElement('div');
btn.innerHTML = '🐶';
btn.style.cssText = 'position:fixed; bottom:150px; right:20px; z-index:2147483647; font-size:30px; background:#d8cdd0; width:55px; height:55px; border-radius:50%; display:flex; justify-content:center; align-items:center; box-shadow:0 4px 12px rgba(0,0,0,0.4); cursor:pointer;';
document.body.appendChild(btn);

// 2. 创建排排狗弹窗容器
const modal = document.createElement('div');
modal.style.cssText = 'display:none; position:fixed; top:5%; left:5%; width:90%; height:90%; z-index:2147483647; background:#fff; border-radius:12px; box-shadow:0 0 25px rgba(0,0,0,0.6); flex-direction:column; overflow:hidden;';

modal.innerHTML = `
    <div style="background:#f4eff0; padding:10px 15px; border-bottom:1px solid #d8cdd0; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-weight:bold; color:#5a5052; font-size:16px;">排排狗工具箱</span>
        <button id="paipai-close-btn" style="color:#e11d48; font-weight:bold; cursor:pointer; background:none; border:none; font-size:15px; padding:0;">关闭 ✖</button>
    </div>
    <iframe id="paipai-iframe" src="scripts/extensions/third-party/paipaigou-plugin/index.html" style="width:100%; flex:1; border:none;"></iframe>
`;
document.body.appendChild(modal);

// 3. 绑定关闭事件
document.getElementById('paipai-close-btn').onclick = () => {
    modal.style.display = 'none';
};

// 4. 绑定点击狗头事件 -> 抓文字 -> 弹窗口
btn.onclick = () => {
    let selectedText = window.getSelection().toString().trim();
    modal.style.display = 'flex';
    
    setTimeout(() => {
        const iframe = document.getElementById('paipai-iframe');
        if (iframe && iframe.contentWindow && selectedText) {
            iframe.contentWindow.postMessage({ type: 'PaiPai_SendText', text: selectedText }, '*');
            window.getSelection().removeAllRanges(); // 取消文字蓝底高亮
        }
    }, 800);
};
