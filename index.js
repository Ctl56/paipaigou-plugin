export async function init() {
    // 1. 创建狗头悬浮球
    const btn = document.createElement('div');
    btn.innerHTML = '🐶';
    btn.style.cssText = 'position:fixed; bottom:150px; right:20px; z-index:2147483647; font-size:30px; background:#d8cdd0; width:55px; height:55px; border-radius:50%; display:flex; justify-content:center; align-items:center; box-shadow:0 4px 12px rgba(0,0,0,0.4); cursor:pointer;';
    document.body.appendChild(btn);

    // 2. 创建弹窗容器
    const modal = document.createElement('div');
    modal.style.cssText = 'display:none; position:fixed; top:5%; left:5%; width:90%; height:90%; z-index:2147483647; background:#fff; border-radius:12px; box-shadow:0 0 25px rgba(0,0,0,0.6); flex-direction:column; overflow:hidden;';
    
    // 3. 弹窗顶部控制栏
    const header = document.createElement('div');
    header.style.cssText = 'background:#f4eff0; padding:10px 15px; border-bottom:1px solid #d8cdd0; display:flex; justify-content:space-between; align-items:center;';
    header.innerHTML = '<span style="font-weight:bold; color:#5a5052; font-size:16px;">排排狗工具箱</span>';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerText = '关闭 ✖';
    closeBtn.style.cssText = 'color:#e11d48; font-weight:bold; cursor:pointer; background:none; border:none; font-size:15px; padding:0;';
    closeBtn.onclick = () => modal.style.display = 'none';
    header.appendChild(closeBtn);
    
    // 4. 加载排排狗的网页
    const iframe = document.createElement('iframe');
    iframe.src = 'scripts/extensions/third-party/paipaigou-plugin/index.html';
    iframe.style.cssText = 'width:100%; flex:1; border:none;';
    
    modal.appendChild(header);
    modal.appendChild(iframe);
    document.body.appendChild(modal);

    // 5. 点击狗头 -> 抓取文字 -> 弹出排排狗
    btn.onclick = () => {
        let selectedText = window.getSelection().toString().trim();
        modal.style.display = 'flex';
        
        setTimeout(() => {
            if (selectedText) {
                iframe.contentWindow.postMessage({ type: 'PaiPai_SendText', text: selectedText }, '*');
                window.getSelection().removeAllRanges(); // 取消高亮
            }
        }, 800);
    };
}
