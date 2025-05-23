<template>
    <div class="warning-container">
        <!-- 旋转的太阳 -->
        <div class="rotating-sun">☀️</div>

        <!-- 热浪背景效果 -->
        <div class="heat-wave"></div>

        <!-- 平台标题 -->
        <div class="title">高温健康风险预报可视化平台</div>
    </div>
</template>

<script>
export default {
    name: 'HeatWaveWarning'
}
</script>

<style scoped>
.warning-container {
    position: relative;
    width: 90%;
    height: 25vh;
    margin: auto;
    margin-top: 2vh;
    background: linear-gradient(to bottom, #ff9966, #ff5e62);
    border-radius: 5px;
    overflow: hidden;
}


.rotating-sun {
    padding-bottom: 2vh;
    position: absolute;
    top: 1vh;
    left: 2vh;
    font-size: 15vh;
    display: inline-block;
    /* 确保transform应用于整个元素 */
    transform-origin: center;
    /* 明确设置旋转中心（默认就是center） */
    animation: rotateSun 8s linear infinite;
    z-index: 9999;
}

@keyframes rotateSun {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.heat-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="rgba(255,255,255,0.1)" d="M0,50 Q25,30 50,50 T100,50" /></svg>');
    background-size: 20vh 10vh;
    animation: wave 8s linear infinite;
}

.title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5vh;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes wave {
    from {
        background-position-x: 0;
    }

    to {
        background-position-x: 200px;
    }
}
</style>
