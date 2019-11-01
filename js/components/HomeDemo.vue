<template>
    <div class="main-wrapper">

        <header class="mobile-header">
            <div class="container">
                <div class="hamburger hamburger--spring"  @click="toggleNav" :class="{'test':isOpen}">
                    <div class="hamburger-box">
                        <div class="hamburger-inner"></div>
                    </div>
                </div>
                <div class="logo-holder">
                    <a href="#" aria-label="Gastech logo">
                        <img src="images/gastech-logo.jpg" alt="Gastech Abstracts">
                    </a>
                </div>
            </div>
        </header>

        <!-- Side navigation -->
        <aside class="sidenav-wrap" :class="{'active':isOpen}">
            <div class="logo-holder">
                <a href="#" aria-label="Gastech logo">
                    <img src="images/gastech-logo.jpg" alt="Gastech Abstracts">
                </a>
            </div>
            <nav class="primary-nav">
                <ul>
                    <li class="active">
                        <a href="#"><i class="icon"><img src="images/icon-abstract.png"
                                    alt="Abstract icon"></i>Abstracts</a>
                        <ul>
                            <li>
                                <a href="#"><i class="icon"></i>Step one</a>
                            </li>
                            <li>
                                <a href="#"><i class="icon"></i>Step two</a>
                            </li>
                            <li>
                                <a href="#"><i class="icon"></i>Step three</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="icon"><img src="images/icon-profile.png" alt="Abstract icon"></i>My
                            profile</a>
                    </li>
                </ul>
            </nav>
            <div class="nav-footer">
                <a href="#">logout</a>
            </div>
        </aside>

        <article class="main-contents-wrap">
          
            <div class="container" style="position: relative;">
                <!-- loader -->
                <div class="loader">
                    <i class="loading"></i>
                </div>
                <header class="content-header">
                    <h2>Author / Presenter</h2>
                    <div class="right-side control-box">
                        <a href="#" class="btn-primary">Create Abstract</a>
                    </div>
                </header>

                <table class="table">
                    <thead>
                        <tr>
                            <th>Abstract ID</th>
                            <th>Title</th>
                            <th>Stream</th>
                            <th>Topic</th>
                            <th>Status</th>
                            <th>Submitted Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-column="Abstract ID">231002</td>
                            <td data-column="Title">Blanditiis dolores enim except</td>
                            <td data-column="Stream">Technical</td>
                            <td data-column="Topic">2</td>
                            <td data-column="Status">3</td>
                            <td data-column="Submitted Date">12/09/2019</td>
                            <td>
                                <a href="#" class="edit-btn"><i class="icon-edit"></i>Edit</a>
                                <a href="#" class="view-btn"><i class="icon-view"></i>view</a>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="Abstract ID">231002</td>
                            <td data-column="Title">Blanditiis dolores enim except</td>
                            <td data-column="Stream">Technical</td>
                            <td data-column="Topic">2</td>
                            <td data-column="Status">3</td>
                            <td data-column="Submitted Date">12/09/2019</td>
                            <td>
                                <a href="#" class="edit-btn"><i class="icon-edit"></i>Edit</a>
                                <a href="#" class="delete-btn"><i class="icon-delete"></i>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="Abstract ID">231002</td>
                            <td data-column="Title">Blanditiis dolores enim except</td>
                            <td data-column="Stream">Technical</td>
                            <td data-column="Topic">2</td>
                            <td data-column="Status">3</td>
                            <td data-column="Submitted Date">12/09/2019</td>
                            <td>
                                <a href="#" class="edit-btn"><i class="icon-edit"></i>Edit</a>
                                <a href="#" class="delete-btn"><i class="icon-delete"></i>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="Abstract ID">231002</td>
                            <td data-column="Title">Blanditiis dolores enim except</td>
                            <td data-column="Stream">Technical</td>
                            <td data-column="Topic">2</td>
                            <td data-column="Status">3</td>
                            <td data-column="Submitted Date">12/09/2019</td>
                            <td>
                                <a href="#" class="edit-btn"><i class="icon-edit"></i>Edit</a>
                                <a href="#" class="delete-btn"><i class="icon-delete"></i>Delete</a>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <header class="content-header">
                    <h2>Author / Presenter</h2>
                    <div class="right-side control-box">
                        <a href="#" class="btn-primary">Create Abstract</a>
                    </div>
                </header>

                <table class="table">
                    <thead>
                        <tr>
                            <th>Abstract ID</th>
                            <th>Title</th>
                            <th>Stream</th>
                            <th>Topic</th>
                            <th>Status</th>
                            <th>Submitted Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-column="Abstract ID">231002</td>
                            <td data-column="Title">Blanditiis dolores enim except</td>
                            <td data-column="Stream">Technical</td>
                            <td data-column="Topic">2</td>
                            <td data-column="Status">3</td>
                            <td data-column="Submitted Date">12/09/2019</td>
                            <td>
                                <a href="#" class="edit-btn"><i class="icon-edit"></i>Edit</a>
                                <a href="#" class="delete-btn"><i class="icon-delete"></i>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="Abstract ID">231002</td>
                            <td data-column="Title">Blanditiis dolores enim except</td>
                            <td data-column="Stream">Technical</td>
                            <td data-column="Topic">2</td>
                            <td data-column="Status">3</td>
                            <td data-column="Submitted Date">12/09/2019</td>
                            <td>
                                <a href="#" class="edit-btn"><i class="icon-edit"></i>Edit</a>
                                <a href="#" class="delete-btn"><i class="icon-delete"></i>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="Abstract ID">231002</td>
                            <td data-column="Title">Blanditiis dolores enim except</td>
                            <td data-column="Stream">Technical</td>
                            <td data-column="Topic">2</td>
                            <td data-column="Status">3</td>
                            <td data-column="Submitted Date">12/09/2019</td>
                            <td>
                                <a href="#" class="edit-btn"><i class="icon-edit"></i>Edit</a>
                                <a href="#" class="delete-btn"><i class="icon-delete"></i>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="Abstract ID">231002</td>
                            <td data-column="Title">Blanditiis dolores enim except</td>
                            <td data-column="Stream">Technical</td>
                            <td data-column="Topic">2</td>
                            <td data-column="Status">3</td>
                            <td data-column="Submitted Date">12/09/2019</td>
                            <td>
                                <a href="#" class="edit-btn"><i class="icon-edit"></i>Edit</a>
                                <a href="#" class="delete-btn"><i class="icon-delete"></i>Delete</a>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </article>

        <!-- side panel -->
        <aside class="side-panel-right">
            <div class="inner-content">
                <header class="clearfix">
                    <div class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.976 51.976">
                            <path
                                d="M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z" />
                            </svg></div>
                </header>

               <div class="content">
                   <form>
                       <div class="form-group"><label for="name" class="form-label">First
                               Name</label>
                           <div class="form-element"><input id="name" type="text" autocomplete="false"
                                   autofocus="autofocus" class="form-control">
                           </div>
                       </div>
                       <div class="form-group"><label for="name" class="form-label">Last
                               Name</label>
                           <div class="form-element"><input id="last_name" type="text" class="form-control"></div>
                       </div>
                       <div class="form-group"><label for="email" class="form-label">Email</label>
                           <div class="form-element"><input id="email" type="text" autocomplete="false"
                                   class="form-control"></div>
                       </div>
                         <div class="form-group"><label for="password" class="form-label">Password</label>
                             <div class="form-element"><input id="password" type="password" autocomplete="false"
                                     class="form-control">
                             </div>
                         </div>
                   </form>
               </div>
            </div>
        </aside>


    </div>

</template>

<script>
    export default {
        name: "HomeDemo",
        data() {
            return {
                toggleStatus: false,
                isOpen:false
            }
    
        },
        directives: {
            outsideClick: {
                bind: function (el, binding, vnode) {
                    el.clickOutsideEvent = function (event) {
                        // here I check that click was outside the el and his childrens
                        if (!(el === event.target || el.contains(event.target))) {
                            // and if it did, call method provided in attribute value
                            vnode.context[binding.expression](event);
                        }
                    };
                    document.body.addEventListener('click', el.clickOutsideEvent)
                },
                unbind: function (el) {
                    document.body.removeEventListener('click', el.clickOutsideEvent)
                },
            }
        },
        methods: {
            dropDownOption: function () {
                this.toggleStatus = !this.toggleStatus;
            },
            test: function () {
                console.log("sadasd");
            },
            toggleNav:function(){
              this.isOpen = !this.isOpen;

            }

        }
    }

</script>

<style scoped>

</style>
