<template>
  <section class="body-sign">
      <div class="center-sign">
        

        <div class="panel panel-sign">
          <div class="panel-title-sign mt-xl text-right">
            <h2 class="title text-uppercase text-bold m-none"><i class="fa fa-user mr-xs"></i> Sign In</h2>
          </div>
          <div class="panel-body">
            <form>
              <input type="hidden" name="_token" :value="csrf">
              <div class="form-group mb-lg">
                <label>Username</label>
                <div class="input-group input-group-icon">
                  <input v-model="email"  type="email" class="form-control input-lg" />
                  <span class="input-group-addon">
                    <span class="icon icon-lg">
                      <i class="fa fa-user"></i>
                    </span>
                  </span>
                </div>
              </div>

              <div class="form-group mb-lg">
                <div class="clearfix">
                  <label class="pull-left">Password</label>
                  <a href="pages-recover-password.html" class="pull-right">Lost Password?</a>
                </div>
                <div class="input-group input-group-icon">
                  <input  v-model="password" type="password" class="form-control input-lg" />
                  <span class="input-group-addon">
                    <span class="icon icon-lg">
                      <i class="fa fa-lock"></i>
                    </span>
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-8">
                  <div class="checkbox-custom checkbox-default">
                    <input id="RememberMe" name="rememberme" type="checkbox"/>
                    <label for="RememberMe">Remember Me</label>
                  </div>
                </div>
                <div class="col-sm-4 text-right">
                  <button  type="button" class="btn btn-primary " :disabled="loading" @click="loginUser()">Sign In</button>
                  
                </div>
              </div>

              <span class="mt-lg mb-lg line-thru text-center text-uppercase">
                <span>or</span>
              </span>

              <div class="mb-xs text-center">
                <a class="btn btn-facebook mb-md ml-xs mr-xs">Connect with <i class="fa fa-facebook"></i></a>
                <a class="btn btn-twitter mb-md ml-xs mr-xs">Connect with <i class="fa fa-twitter"></i></a>
              </div>

              <p class="text-center">Don't have an account yet?<router-link class="nav-link" to="/signup"> Sign Up</router-link></p>

            </form>
          </div>
        </div>

        
      </div>
    </section>
</template>

<script>
import Axios from 'axios'

export default {

    beforeRouteEnter(to, from , next) {

        if (localStorage.getItem('auth')) {

            return next({ path: "/home"})

        }
        next();

    },

    data() {

        return {

          csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),

            email: '',
            password: '',
            errors: '',
            loading: false,
            remember: true
        }
    },
    methods: {

        loginUser(){

                this.loading = true;
                Axios.post('localhost:8001/login', {

                    email: this.email,
                    password: this.password,
                    remember: this.remember

                },{
                    headers: {
                           'Access-Control-Allow-Origin': '*',
                           'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
                           'Access-Control-Allow-Headers': 'Content-type,Accept,X-Access-Token,X-Key'
                    }

                  }).then(response => {
                    this.loading = false

                    this.$root.auth = response.data.data;

                    localStorage.setItem('auth', JSON.stringify(response.data.data));

                    this.$router.push("/home")

                }).catch(({ response }) =>{
                     this.loading = false
                    if (response.status === 401 ) {

                        this.errors = {
                            email: ['These credentials do not match our records']
                        }
                    }else{
                            this.errors = response.data;
                    }

                    

                });
        
        }
    }
}
  

</script>
<style>

  .nav-link:hover {
    text-decoration:none !important;
  }
</style>