<template>
    <div>
        <img src="/img/logo.png" alt="">
        <div class="form-wrapper">
            <h1 class="text-white mb-5">Login</h1>
            <form @submit.prevent="submit()">
                <label class="form-label text-white" for="code">Código de acesso</label>
                <input class="form-control mb-4" type="password" name="code" id="code" />
                <button class="btn" type="submit">Entrar</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
function submit() {
    alert('teste')
}
</script>
<style scoped lang="scss">
    img {
        position: relative;
        top: 7.2%;
        right: 3%;
        filter: drop-shadow(5px 5px 5px rgb(182, 177, 177, 0.2));
    }
    div {
       background: var(--Tertiary, #335A81);
       height: 100%;
       display: flex;
       align-items: center;
       flex-direction: column;
       justify-content: center;
       .form-wrapper {
            width: 50%;
            height: 50%;
            background-image: url('img/Group 7.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
            h1 {
                position: relative;
                right: 55px;
                top: 25px;
                font-family: sans-serif;
                font-weight: bold;
            }
            form {
                width: 40%;
                label {
                    font-size: 1.2rem;
                }
                input {
                    width: 65%;
                }
                button {
                    width: 45%;
                    font-weight: bold;
                    color: white;
                    font-family: sans-serif;
                    background-color: #04ddb6;
                }
            }
        }
    }
</style>