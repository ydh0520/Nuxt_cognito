<template>
    <div>
        <!-- 로그인 창 -->
        <div v-if="type==0">
            <input type="email" v-model="id">
            <input type="password" v-model="password">
            <button @click="login()">로그인하기</button>
            <button @click="type=1">회원가입하기</button>
            <button @click="type=2">비밀번호 찾기</button>
        </div>
        <!-- 회원가입 창 -->
        <div v-if="type==1">
            <input type="text" v-model="id">
            <input type="password" v-model="password">
            <input type="text">
            <input type="text">
            <input type="text">
            <button @click="signUp()">가입하기</button>
        </div>
        <!-- 비밀번호 찾기 창 -->
        <div v-if="type==2">
            <input type="text">
            <input type="email">
            <button>비밀번호 찾기</button>
            <button @click="type=0">로그인하기</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            type:0,
            id:'',
            password:'',
            verifyCode:''
        }
    },
    methods:{
        login(){
            axios.post('/login',{
                id:this.id,
                password:this.password
            }).then((result)=>{

            })
        },
        signUp(){
            axios.post('/signUp',{
                id:this.id,
                password:this.password
            }).then((result)=>{

            })
        }
    }
}
</script>

<style>

</style>
