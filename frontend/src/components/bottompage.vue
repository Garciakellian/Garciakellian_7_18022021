<!-- FOOTER PRESENT SUR CHAQUE PAGE-->
<template>
    <footer >
      <img alt="logo Groupomania"
      class="logoHome"
      src="../assets/icon-left-font.png"/>
      <div class="footer">
        <p class='footer-p'> &copy; 2020 Copyright Groupomania</p>
      </div>
    </footer>

</template>

<script>
export default {
  name: 'bottompage',
}
</script>

<style scopped>
.logoHome{
  width:30%;
  margin: 30px 0 50px 0 ;
}
.footer{
  width: 100%;
  height: 50px;
  background: #091f34;
  color:white
}
.footer-p{
    padding-top: 14px;
}

</style>