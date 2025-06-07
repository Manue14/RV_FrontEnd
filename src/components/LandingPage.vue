<template>
    <div class="landing">
        <div class="logo-container">
            <img src="../assets/logo.png" class="logo"/>
        </div>
        <div class="text-container">
            <p class="name">ɅNTICIPɅ</p>
            <p class="desc">Tecendo Datos</p>
        </div>
    </div>
</template>

<style scoped>
    .landing {
        width: 100%;
    }

    .logo {
        width: 30vw;
    }

    .name {
        font-family: 'Montserrat', sans-serif;
        font-size: 8rem;
        font-weight: 300;
        letter-spacing: 2.3rem;
        margin-bottom: 2rem;
    }

    .desc {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem;
    }

    .logo-container {
        margin: auto;
        margin-top: 5%;
        margin-bottom: 2%;
        width: fit-content;
    }

    .text-container {
        margin: auto;
        width: fit-content;
    }

    .text-container > p {
        text-align: center;
    }
</style>