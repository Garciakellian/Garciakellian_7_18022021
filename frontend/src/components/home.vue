<!-- PAGE HOME -->
<template>
    <div>
        
    </div>
</template>

<script>
export default{
    name:'home',

    data(){
        return{}
    },
    created () {// Identifie si l'user est connecter ou non
        let connected = this.$session.get('connected');
        if(connected > 0){
            window.location.href = "http://localhost:8080/#/mur";
            location.reload(true);
        } else{
            window.location.href = "http://localhost:8080/#/acceuil";
            location.reload(true);
}

    }
}




</script>


<style>

</style>