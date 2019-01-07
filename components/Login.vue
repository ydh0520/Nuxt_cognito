<template>
    <div>
        <div v-if="type==0">
            <input type="text">
            <input type="password">
            <button>로그인하기</button>
            <button @click="type=1">회원가입하기</button>
            <button @click="type=2">비밀번호 찾기</button>
        </div>
        <div v-if="type==1">
            <input type="text">
            <input type="password">
            <input type="text">
            <input type="text">
            <input type="text">
            <button>가입하기</button>
        </div>
        <div v-if="type==2">
            <input type="text">
            <input type="email">
            <button>비밀번호 찾기</button>
            <button @click="type=0">로그인하기</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            type:0
        }
    }
}
</script>

<style>

</style>
