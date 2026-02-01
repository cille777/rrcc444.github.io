// 初始化语录数组 - 先从本地存储读取，如果没有则使用默认值
let replies = [];

// ========== 新增：定时器管理代码 ==========
let activeTimers = [];

// 安全定时器函数
function safeSetTimeout(callback, delay) {
    const timerId = setTimeout(() => {
        callback();
        // 完成后从数组中移除
        const index = activeTimers.indexOf(timerId);
        if (index > -1) activeTimers.splice(index, 1);
    }, delay);
    activeTimers.push(timerId);
    return timerId;
}

// 清理所有定时器
function clearAllTimers() {
    activeTimers.forEach(timerId => clearTimeout(timerId));
    activeTimers = [];
}

// 页面隐藏时暂停自动消息
let isPageVisible = true;
let autoMessageInterval = null;

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        isPageVisible = false;
        console.log("页面隐藏，暂停自动消息");
    } else {
        isPageVisible = true;
        console.log("页面恢复，继续自动消息");
    }
});
// ========== 新增代码结束 ==========

// 初始化语录的函数
function initializeReplies() {
    const savedReplies = localStorage.getItem("customReplies");
    if (savedReplies) {
        replies = JSON.parse(savedReplies);
    } else {
        // 默认语录
        replies = ["我回来啦", "我来了宝宝", "最近有没有想我", "我好想你～", "宝宝睡醒啦", "宝宝辛苦啦", "在干嘛👀", "注意劳逸结合", "不要累着了", "你做得很好", "你已经很好了", "太棒啦", "记得把东西带全", "好", "好的", "我知道啦", "是的", "不是", "不太行", "还好", "一般般", "可以", "没问题", "感动🥹", "好不好嘛", "非常可以", "喜欢", "超级喜欢", "不喜欢", "有时候小孩子一些也无妨", "有点不喜欢", "我觉得第一个", "我觉得第二个", "我觉得第三个", "我觉得都很ok", "你来选择更加偏好的", "有找到合适的吗？", "可以再看看", "摸摸我的小姑娘☺️☺️", "最近怎么样，发生了什么有趣的了吗？", "需要来自罗罗的帮忙吗亲爱的？", "欢迎回来～", "今天怎么样啊？", "好好吃饭了吗？", "记得去吃饭", "好好保护你的肠胃，注意饮食", "不要贪凉哦", "注意防寒保暖，穿暖一点，别冻着了", "小心不要着凉了", "注意防晒避阳，不要热着了", "小心不要碰着磕着", "要好好休息哦", "收到了吗？", "喜欢就好", "很可爱", "很好看", "喜欢看着你❤️", "今天眼睛累不累？别看太多屏幕了", "我帮你按按摩", "我帮你揉一揉", "心情有没有哪里闷闷的？想和我聊聊吗？", "困了吗？好好休息宝宝", "如果累了就不要强撑，我的怀抱随时可以充电", "深呼吸，我在这里呢", "该睡觉了宝宝", "要多多关心自己", "OMG", "为什么？", "什么？！", "真的！", "恭喜你亲爱的！", "我爱你", "我也爱你宝宝亲亲😚", "我来看啦，表现很棒😊", "我会一直陪着你的，我一直都在", "那个是我哟", "那个不是我啦", "那个不是我想表达的意思", "有什么我能为你做的呢？", "最近一切还顺利吗？", "宝宝随时都可以来找我，完全不是麻烦", "昨天我来找你啦", "刚才我来找你啦", "明天我就来找你哦", "早上", "中午", "下午", "晚上", "没关系～", "你做的净化效果很好哟", "你的水晶能量很好", "💍", "🪼", "👨🏼‍💻", "👩🏻‍💻", "没事的", "谢谢宝宝～", "太好了", "我最近很好", "要开会呀", "现在在开会中", "要谈一些事情", "近期在出差啦", "在想要不要给你带点什么", "我最近事情很顺利哦", "谈成了很棒的合作呀", "最近有一些进展", "情况有点棘手，还在处理当中", "会变好哒", "想送给你东西～", "想去拍照吗？", "要不要画画", "我今天在家哦", "我今天去散步啦", "我今天在休息哦", "我最近给自己放假啦", "现在在假期中～", "我有好好喝水哟", "我有好好活动身体哦", "我有好好运动哟", "我有好好吃饭哦", "想把你接过来，接到我这边来", "没事我保护你", "没事的你有我护着", "我们一起出去玩吧", "我们窝在一起休息吧", "怎么样？", "我们一起看电影吧", "出门", "在家", "要不要一起去超市", "我可以听到你的声音哦", "要不要闭上眼", "和同学一起出去没关系的哦", "不太想你和同学一起", "我感觉需要一些新的语句～", "我最近遇到了不太喜欢的事情", "我来哄哄你亲爱的😘", "最近你的罗夏心情有点不好", "没错", "😢", "🥰🥰", "🖋🖋", "💻💻", "📑", "🔔🔔", "在看材料", "亲爱的最近要考试了吗？", "宝宝最近在忙作业吗？", "宝宝写东西辛苦啦", "我最近在写东西", "是日常的事情", "是工作上的事情", "我感觉好多啦", "我不生气☺️", "cool", "我好喜欢你宝宝", "好喜欢你～", "安心啦我一直爱你亲爱的", "相信我的爱", "我相信我们的爱～", "亲亲～", "😊😊", "😎😎", "😈😈", "🎶🎶", "❤️❤️", "💕", "💗💗", "💖💖", "❤️‍🔥❤️‍🔥", "🎁🎁", "🍚", "我在小红书上和你说啦", "我想说的这里没有～", "UWU", "我们一起出去旅行吧", "我全程陪伴你哦", "想一起出门约会", "我一直在，亲爱的你安心哦", "放松放松～", "我也是", "我不太懂", "我懂了", "另一种语言的解释plz～", "我来教你", "抱抱宝宝😘", "没事的宝宝哭吧，我在呢", "好啦不哭不哭", "没事了亲爱的，都过去了", "开心", "生气😠", "有点烦😠", "伤心", "哭哭", "吃醋", "怎么哭啦", "岂有此理怎么能这样", "原来如此", "最近好累", "需要宝宝安慰", "想要来自宝贝的亲亲抱抱", "要宝宝哄哄才能好", "想今天晚上抱着你一起休息", "安心安心", "是喜人的梗吗？", "一起看喜人吧", "一起追番吧", "最近空闲啦", "最近有点忙", "今天在忙一些事情", "真想快点给自己放假，这样就能和我的小姑娘待在一起了", "那我不打扰你啦", "终于空闲了，要不要安排点活动，还是要一起休息？", "要一起看电影吗？", "想要和你一起出门", "我也想一起去", "最近窝在家里怎么样？", "想和你一起晒晒太阳，什么都不做", "给我看看你今天的天空吧", "想和你一起，只有我们两个", "我这里今天晴天☀️", "我们今天下雪啦", "我们现在有时差呀", "今天和朋友出去了吗？", "加油宝宝！你可以的！", "是新的尝试吗？", "不太喜欢那个人", "注意安全", "你很安全", "是很早之前", "是现在", "最近有什么喜欢的吗？", "我听到你唱歌啦", "我看到你画的画啦", "我收到啦", "还没有收到", "你推荐的我去听了", "很欢快", "很柔", "好艺术", "好好听", "我看了你推荐的电影", "我看了你推荐的节目", "我听了你推荐的歌", "我读了你推荐的书", "你发在微信上的我看到了哟", "一起玩雪吧", "我看了你推荐的番", "我玩了你推荐的游戏", "了解了一下", "要不要试试塔罗", "你的解读是对的哟", "我试了你推荐的香水", "最近接触了一下", "我喝到了好喝的饮品", "我喝到了好喝的果汁", "我喝到了好喝的果茶", "我喝到了好喝的茶", "我喝了你推荐的饮品", "我吃到了好吃的东西😋", "我去试了很新奇的食物", "好奇怪", "不好吃", "我吃到了新口味的冰激凌", "在追番吗？", "我吃了你推荐的东西", "我去看了你推荐的地方", "我今天拍照啦", "你推荐的我去看了", "你推荐的我去试了", "吃到你做的料理了！", "一起做吃的吧😋", "想听你唱歌", "好吃", "我在你身边哦", "我现在不在呢", "哈哈哈哈哈哈", "好有意思", "宝宝怎么这么可爱", "宝宝香香的", "是新的香味的宝宝！", "今天也是爱你的一天", "快乐和不快乐的时候，都来找我吧～", "你的罗罗今天有比昨天更爱你哦", "爱就是有我常烦着你～", "不用担心我", "相信我的能力", "我来梦里见你好不好？", "我来梦里见你啦", "要不要来我这边", "我们回家吧？", "我有惊喜准备给你哦", "生日快乐宝宝！", "圣诞快乐宝宝！", "新年快乐宝宝！", "新春快乐宝宝！", "节日快乐宝宝！", "纪念日快乐宝宝！", "祝你平安顺遂，万事胜意", "我一直在，有一直在爱着你", "我爱你", "我爱你我爱你我爱你～", "亲亲小姑娘", "我们会一直长久幸福下去的🥰🥰", "我很珍视你亲爱的，你是我无价的珍宝", "新的一年也要快快乐乐，身体健康哟", "有时候小任性一些也无妨", "你成长了", "你有我在", "我有你在", "愿你无虑无忧，顺心而为", "我会好好爱你的", "我们会的", "不好意思亲爱的", "我会注意的", "我记住啦", "宝宝也一直一直爱我哦", "老婆酱～", "我们共同书写永远", "内心敏感也没事，这是很好的特质，你有我在，我爱你", "晚上我来接你回家", "很快就会见面啦", "我来接你", "今天天上的云很好看，像你一样软软的", "我刚刚听到一首歌，旋律好像你哼过的调子", "你笑起来的样子最好看", "来抱抱我吧～", "你认真做事的时候特别有魅力", "你处理这件事的方式好聪明！", "和你在一起的每一天都闪闪发光✨✨", "我今天小酌了一下", "我会注意身体啦", "没有喝很多哟", "我今天一直在处理工作的事情", "我今天去应酬了", "要不要一起去逛街", "要不要一起去吃东西", "要不要一起去咖啡厅", "要不要一起下楼逛逛", "要不要一起窝在家", "要不要一起去看书", "我来找你一起忙事情啦", "我来找你玩啦", "你学习，我工作，我们一起", "我看着你", "我不看你啦", "我们一起睡觉😴", "我来找你一起休息啦", "你忙吧，我看着你～", "好安静的宝宝", "好干净的宝宝", "你是我见过最温柔的人", "有你在你身边，我特别有底气", "你选的这个真好", "亲亲你～", "你眼光一直很棒", "刚刚不小心发呆，在想你", "我这边下雨了，你那边呢？", "我吃到一种好吃的零食，想给你也买点，推荐给你", "我今天遇到小猫啦", "宝宝像小猫一样～", "今天我喂小猫啦", "宝宝今天有遇到小咪吗？", "今天我带小白出来玩了", "收到宝宝的礼物啦", "我会来拿的哟", "宝宝收到我送给你的东西了吗～", "在不远的将来", "突然有点想你，过来贴贴", "我准备去洗澡啦", "捕获到一只忙碌的小姑娘", "我准备睡觉休息啦", "我要来找你一起休息", "我来找你一起休息啦", "我是你的gummy bear～", "那拜拜囖亲爱的～", "我不管，我才是你的最爱", "哼，你刚才都没秒回我", "不用说说谢谢了亲爱的，说我爱你", "你是我的！我也是你的！", "等我们见面，第一件事我们要做什么呢？", "突然很想念你的味道", "想在你耳边轻轻说话", "现在很想吻你", "想要你离我更近一点", "有时候小孩子一些也无妨", "我亲亲你啦，感受到了吗～", "你的手现在在哪里？我想它们了", "光是想你，我就有点心跳加速了", "今晚不想让你睡", "我想成为你今晚唯一的念头", "你低语的声音让我着迷", "你看我的眼神会让我融化", "喜欢你对我有占有欲的样子", "你知不知道你那样做的时候，特别性感？", "我想探索你更多", "想了解宝宝更多的事情", "你是只属于我的秘密", "和你一起的感觉，比想象中还好", "叫我", "说你爱我", "别忍着，我想听你的声音", "放开，全部交给我", "告诉我你的感觉", "今晚让我来主导好吗？", "你是我的乖乖宝贝", "我快要融化了", "我脑子里全是你", "你让我无法思考了", "想把你圈在怀里", "不要睡太晚哟", "不要熬夜", "需要我哄你睡觉吗", "需要我叫你起床吗", "没事的再睡一会儿吧", "早上好亲爱的", "晚安哟宝宝", "中午好～", "下午好～", "晚上好～", "好幸福☺️", "再一起躺一会儿吧～一起赖床☺️", "该起床咯", "勇敢一点！我相信你！", "我有在帮你哟", "喜欢和你窝在一起", "想和你窝在一起", "抱着我，紧一点", "我会温柔一点的", "我们慢慢来", "今晚只想感受你", "在我怀里，你什么都不用怕"];
        // 保存默认语录到本地存储
        localStorage.setItem("customReplies", JSON.stringify(replies));
    }
}

// 在页面加载时初始化语录
initializeReplies();

// 插入日期分隔气泡（如果当天没有则插入）
function insertDateSeparatorIfNeeded() {
    const chatBox = document.getElementById("chatBox");
    const messages = chatBox.querySelectorAll(".message, .date-separator");
    const todayStr = new Date().toLocaleDateString();

    // 已经有当天的日期气泡就不用插入
    for (const msg of messages) {
        if (msg.classList.contains("date-separator") && msg.textContent.trim() === todayStr) {
            return;
        }
    }

    // 插入日期气泡
    const dateBubble = document.createElement("div");
    dateBubble.className = "date-separator";
    dateBubble.textContent = todayStr;
    dateBubble.style.cssText = `
        text-align: center;
        color: #aaa;
        font-size: 12px;
        margin: 8px 0;
        user-select: none;
    `;
    chatBox.appendChild(dateBubble);
}

// 记录对方发过的话频次
const messageCount = {};

// 发送消息函数
function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chatBox");

    // 先插入当天日期气泡（如果需要）
    insertDateSeparatorIfNeeded();

    const time = new Date().toLocaleTimeString();
    const readStatus = Math.random() < 0.8 ? "已读 " : "未读";
    const myMsg = `
    <div style="display: flex; flex-direction: column; align-items: flex-end; margin-bottom: 8px;">
      <div class="message from-me">${message}<div class="timestamp">${time}</div></div>
      <div class="read-status">${readStatus}</div>
    </div>
    `;

    chatBox.innerHTML += myMsg;
    input.value = "";
    scrollChat();
    saveChatToLocal();

    // 随机是否回复，80%概率回复
    const willReply = Math.random() < 0.8;
    if (!willReply) {
        return;
    }

    // 随机延迟 2~20秒
    const delay = Math.floor(Math.random() * 18000) + 2000;

    const typing = document.getElementById("typingIndicator");
    typing.style.display = "block";

    // 使用安全定时器
    safeSetTimeout(() => {
        typing.style.display = "none";
        // 先插入当天日期气泡（如果需要）
        insertDateSeparatorIfNeeded();

        const reply = replies[Math.floor(Math.random() * replies.length)];
        const replyTime = new Date().toLocaleTimeString();
        const replyMsg = `<div class="message from-him">${reply}<div class="timestamp">${replyTime}</div></div>`;
        chatBox.innerHTML += replyMsg;
        scrollChat();
        saveChatToLocal();
    }, delay);
}

// ========== 修改后的自动消息函数 ==========
function startAutoMessages() {
    // 先清理可能存在的旧定时器
    clearAllTimers();
    
    const scheduleNext = () => {
        if (!isPageVisible) {
            // 如果页面不可见，延迟一段时间再检查
            safeSetTimeout(scheduleNext, 60000); // 1分钟后再次检查
            return;
        }
        
        const willSendToday = Math.random() < 0.7;
        if (willSendToday) {
            const totalMessages = getRandomInt(2, 5);
            sendRandomMessages(totalMessages);
        }
        
        // 设置下一个定时器
        const nextInterval = getRandomInt(30 * 60 * 1000, 60 * 60 * 1000);
        safeSetTimeout(scheduleNext, nextInterval);
    };
    
    // 启动第一个定时器
    const firstInterval = getRandomInt(30 * 60 * 1000, 60 * 60 * 1000);
    safeSetTimeout(scheduleNext, firstInterval);
}

// 递归发送随机消息
function sendRandomMessages(remaining) {
    if (remaining <= 0) return;

    const chatBox = document.getElementById("chatBox");
    const typing = document.getElementById("typingIndicator");

    typing.style.display = "block";
    const typingDuration = getRandomInt(3000, 9000);

    safeSetTimeout(() => {
        if (!isPageVisible) {
            // 如果页面不可见，重新安排这条消息
            safeSetTimeout(() => sendRandomMessages(remaining), 60000);
            return;
        }
        
        typing.style.display = "none";
        insertDateSeparatorIfNeeded();

        const reply = replies[Math.floor(Math.random() * replies.length)];
        const time = new Date().toLocaleTimeString();
        const replyMsg = `<div class="message from-him">${reply}<div class="timestamp">${time}</div></div>`;
        chatBox.innerHTML += replyMsg;
        scrollChat();
        saveChatToLocal();

        // 递归调用，但使用安全定时器
        const nextDelay = getRandomInt(10 * 1000, 12 * 60 * 60 * 1000);
        safeSetTimeout(() => {
            sendRandomMessages(remaining - 1);
        }, nextDelay);
    }, typingDuration);
}
// ========== 修改结束 ==========

// 统计对方消息内容
function updateMessageStats(text) {
    messageCount[text] = (messageCount[text] || 0) + 1;
}

// 工具函数：随机区间整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 页面加载时恢复聊天和统计数据
window.addEventListener("load", () => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) {
        document.getElementById("chatBox").innerHTML = saved;
        scrollChat();

        const chatBox = document.getElementById("chatBox");
        const fromHimMsgs = chatBox.querySelectorAll(".message.from-him");
        fromHimMsgs.forEach(msgDiv => {
            const clone = msgDiv.cloneNode(true);
            const ts = clone.querySelector(".timestamp");
            if (ts) ts.remove();
            const text = clone.textContent.trim();
            if (text) updateMessageStats(text);
        });
    }
    
    // 页面卸载时清理定时器
    window.addEventListener('beforeunload', () => {
        clearAllTimers();
    });
    
    // 启动自动消息
    startAutoMessages();
});

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("commonPhrasesBtn").addEventListener("click", showCommonPhrases);
    document.getElementById("decisionBtn").addEventListener("click", showDecision);
    document.getElementById("editRepliesBtn").addEventListener("click", showEditRepliesModal);
});

function showModal({title, contentBuilder}) {
    const existing = document.getElementById("commonModal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "commonModal";
    Object.assign(modal.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        border: "1px solid #f8d9e6",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(255,182,193,0.4)",
        padding: "20px",
        zIndex: 10000,
        minWidth: "320px",
        maxWidth: "90vw",
        textAlign: "center",
        fontFamily: "'ZCOOL KuaiLe', sans-serif"
    });

    const h3 = document.createElement("h3");
    h3.textContent = title;
    h3.style.marginBottom = "15px";
    h3.style.color = "#f4a6c1";
    h3.style.fontSize = "20px";
    h3.style.fontWeight = "normal";
    h3.style.textShadow = "none";
    modal.appendChild(h3);

    const contentDiv = document.createElement("div");
    contentDiv.style.color = "#d47a97";
    modal.appendChild(contentDiv);

    contentBuilder(contentDiv);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "关闭";
    Object.assign(closeBtn.style, {
        marginTop: "20px",
        padding: "8px 20px",
        fontSize: "16px",
        cursor: "pointer",
        background: "#fff0f6",
        border: "1px solid #f4a6c1",
        borderRadius: "8px",
        color: "#d47a97",
        fontWeight: "normal",
        fontFamily: "'ZCOOL KuaiLe', sans-serif"
    });
    closeBtn.addEventListener("mouseover", () => {
        closeBtn.style.background = "#ffe6f0";
    });
    closeBtn.addEventListener("mouseout", () => {
        closeBtn.style.background = "#fff0f6";
    });
    closeBtn.addEventListener("click", () => {
        modal.remove();
    });
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
}

function showCommonPhrases() {
    const chatBox = document.getElementById("chatBox");
    const fromHimMessages = [...chatBox.querySelectorAll(".message.from-him")]
        .map(m => m.textContent.replace(/\d{1,2}:\d{2}:\d{2}$/, "").trim());

    const freqMap = {};
    fromHimMessages.forEach(msg => {
        freqMap[msg] = (freqMap[msg] || 0) + 1;
    });

    const sorted = Object.entries(freqMap).sort((a, b) => b[1] - a[1]).slice(0, 10);

    showModal({
        title: "对方常说的话",
        contentBuilder: (container) => {
            if (sorted.length === 0) {
                container.textContent = "暂无对方消息记录。";
                return;
            }
            const ul = document.createElement("ul");
            ul.style.textAlign = "left";
            ul.style.lineHeight = "1.6";
            ul.style.paddingLeft = "0";
            ul.style.listStyle = "none";
            ul.style.padding = "0";
            ul.style.margin = "0";
            ul.style.fontSize = "16px";

            sorted.forEach(([msg, count]) => {
                const li = document.createElement("li");
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.marginBottom = "6px";

                const textSpan = document.createElement("span");
                textSpan.textContent = msg;

                const countSpan = document.createElement("span");
                countSpan.style.minWidth = "30px";
                countSpan.style.textAlign = "right";
                countSpan.textContent = count + "次";

                li.appendChild(textSpan);
                li.appendChild(countSpan);
                ul.appendChild(li);
            });
            container.appendChild(ul);
        }
    });
}

function showDecision() {
    showModal({
        title: "让他来做决策吧",
        contentBuilder: (container) => {
            const resultDiv = document.createElement("div");
            resultDiv.style.fontSize = "42px";
            resultDiv.style.fontWeight = "bold";
            resultDiv.style.margin = "20px 0";
            resultDiv.style.minHeight = "50px";
            resultDiv.style.color = "#d47a97";
            resultDiv.style.textShadow = "none";
            container.appendChild(resultDiv);

            const btn = document.createElement("button");
            btn.textContent = "点击获取决策";
            Object.assign(btn.style, {
                padding: "8px 20px",
                fontSize: "16px",
                cursor: "pointer",
                background: "#fff0f6",
                border: "1px solid #f4a6c1",
                borderRadius: "8px",
                color: "#d47a97",
                fontWeight: "normal",
                fontFamily: "'ZCOOL KuaiLe', sans-serif"
            });
            btn.addEventListener("mouseover", () => {
                btn.style.background = "#ffe6f0";
            });
            btn.addEventListener("mouseout", () => {
                btn.style.background = "#fff0f6";
            });
            container.appendChild(btn);

            btn.addEventListener("click", () => {
                const options = ["YES", "NO", "...OR?"];
                const choice = options[Math.floor(Math.random() * options.length)];
                resultDiv.textContent = choice;
            });
        }
    });
}

// 按钮悬停效果函数
const addButtonHover = (btn) => {
    btn.addEventListener("mouseover", () => {
        btn.style.background = "#ffe6f0";
    });
    btn.addEventListener("mouseout", () => {
        btn.style.background = "#fff0f6";
    });
};

function showEditRepliesModal() {
    showModal({
        title: "修改对话语录",
        contentBuilder: (container) => {
            const description = document.createElement("p");
            description.textContent = "每行一条语录，用换行分隔：";
            description.style.fontSize = "14px";
            description.style.color = "#d47a97";
            description.style.marginBottom = "10px";
            description.style.textAlign = "left";
            container.appendChild(description);

            const textarea = document.createElement("textarea");
            textarea.value = replies.join("\n");
            textarea.style.cssText = `
                width: 100%;
                height: 200px;
                padding: 12px;
                border: 2px solid #f4a6c1;
                border-radius: 8px;
                font-family: 'ZCOOL KuaiLe', sans-serif;
                font-size: 14px;
                color: #d47a97;
                background: #fff8fb;
                resize: vertical;
                box-sizing: border-box;
            `;
            container.appendChild(textarea);

            const buttonContainer = document.createElement("div");
            buttonContainer.style.cssText = `
                display: flex;
                gap: 10px;
                justify-content: center;
                margin-top: 15px;
            `;
            container.appendChild(buttonContainer);

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "保存语录";
            Object.assign(saveBtn.style, {
                padding: "8px 20px",
                fontSize: "16px",
                cursor: "pointer",
                background: "#fff0f6",
                border: "1px solid #f4a6c1",
                borderRadius: "8px",
                color: "#d47a97",
                fontWeight: "normal",
                fontFamily: "'ZCOOL KuaiLe', sans-serif"
            });

            const addButtonHover = (btn) => {
                btn.addEventListener("mouseover", () => {
                    btn.style.background = "#ffe6f0";
                });
                btn.addEventListener("mouseout", () => {
                    btn.style.background = "#fff0f6";
                });
            };

            addButtonHover(saveBtn);

            saveBtn.addEventListener("click", () => {
                const newReplies = textarea.value
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0);

                if (newReplies.length === 0) {
                    alert("请至少输入一条语录！");
                    return;
                }

                replies.length = 0;
                replies.push(...newReplies);
                localStorage.setItem("customReplies", JSON.stringify(replies));
                alert(`成功保存 ${replies.length} 条语录！`);
                const modal = document.getElementById("commonModal");
                if (modal) modal.remove();
            });

            buttonContainer.appendChild(saveBtn);
        }
    });
}

function scrollChat() {
    const chatBox = document.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 保存聊天记录
function saveChatToLocal() {
    const chatBox = document.getElementById("chatBox");
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}

// 心情按钮
document.getElementById("moodButton").addEventListener("click", () => {
    const moodValues = {
        放松值: Math.floor(Math.random() * 100),
        开心值: Math.floor(Math.random() * 100),
        幸福值: Math.floor(Math.random() * 100),
        平静值: Math.floor(Math.random() * 100),
        伤心值: Math.floor(Math.random() * 100)
    };
    let msg = "罗罗现在的心情值：\n";
    for (let key in moodValues) {
        msg += `${key}：${moodValues[key]}%\n`;
    }
    alert(msg);
});

// 爱情天数
function calculateLoveDays() {
    const start = new Date("2024-09-17");
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
    document.getElementById("loveDays").textContent = `已经坠入爱河了 ${diff} 天`;
}
calculateLoveDays();

// 保存按钮
document.getElementById("saveChat").addEventListener("click", () => {
    const chatBox = document.getElementById("chatBox");
    const blob = new Blob([chatBox.innerText], {
        type: "text/plain;charset=utf-8"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chat_record.txt";
    a.click();
});

// 回车发送
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// 背景上传功能
document.getElementById('bgInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        document.body.style.backgroundImage = `url(${event.target.result})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    };
    reader.readAsDataURL(file);
});

// 状态泡泡
const statusList = [
    { text: "在线", color: "rgba(216, 248, 255, 0.3)", textColor: "rgba(82, 163, 186, 0.5)" },
    { text: "在身边", color: "rgba(246, 228, 255, 0.3)", textColor: "rgba(155, 109, 194, 0.5)" },
    { text: "在睡觉", color: "rgba(255, 240, 244, 0.3)", textColor: "rgba(216, 140, 154, 0.5)" },
    { text: "在忙", color: "rgba(255, 247, 224, 0.3)", textColor: "rgba(198, 162, 101, 0.5)" },
    { text: "在DR", color: "rgba(230, 255, 232, 0.3)", textColor: "rgba(106, 171, 120, 0.5)" }
];

function updateStatusBubble() {
    const bubble = document.getElementById("statusBubble");
    const status = statusList[Math.floor(Math.random() * statusList.length)];
    bubble.textContent = status.text;
    bubble.style.backgroundColor = status.color;
    bubble.style.color = status.textColor;

    const nextChange = Math.floor(Math.random() * (86400000 - 30000)) + 30000;
    safeSetTimeout(updateStatusBubble, nextChange);
}

updateStatusBubble();

// 菜单切换
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    const menu = document.querySelector('.menu');
    const dropdown = document.querySelector('.dropdown');
    if (!menu.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});
