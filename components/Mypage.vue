<template>
    <div>
        로그인 완료
        <button @click="servertest()">
            server
        </button>
    </div>
</template>

<script>
export default {
    methods:{
        servertest(){
            var xhr=new XMLHttpRequest();
            xhr.open('POST','http://127.0.0.1:3000')
            xhr.setRequestHeader('Content-type', "application/json");
            xhr.send();

            xhr.addEventListener('load',function(){
                var result=JSON.parse(xhr.responseText);
                console.log(result.token)
            })
        }
    }
}
</script>

<style>

</style>
