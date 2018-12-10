<template>
    <div class="c-competition">
        <div class="c-question">
            {{index+1+' . '+competition.question}}
        </div>
        <div class="c-answer">
            <div class="c-a-item" v-for="(item,answerIndex) in competition.answer" :key="answerIndex">
                <div class="c-a-index">
                    {{'（'+(answerIndex+1)+'）'}}
                </div>
                <div class="c-a-input">
                    <input type="text">
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name:'competition',
        props:{
            competition:Object,
            index:Number
        }
    }
</script>

<style scoped>
.c-competition{
    padding: 8px 10px;
}
.c-a-item{
    padding: 4px 10px;
    display: flex;
    align-items: center;
}
.c-a-index{
    display: inline-block;
}
.c-a-input{
    display: inline-block;
    width: 200px;
}
input{
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: #009688;

    padding: 4px;
}
input:focus{
    outline: none;
}
</style>