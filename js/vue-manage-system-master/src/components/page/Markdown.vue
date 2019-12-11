<template>
    <div>
        <div style="margin-left: 80px;margin-top: 95px">
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" @change="change" style="min-height: 600px;width: 957px"/>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import { mdupload } from '../../api/goods'
    import { mdupload02 } from '../../api/goods'
    import { mdupload03Totarget } from '../../api/goods'
    import { mdupload04Tofront } from '../../api/goods'
    import { deleteGoodsColorimg } from '../../api/goods'

    export default {
        name: 'markdown',
        props:{
            contentsb:'',
        },
        watch: {
            contentsb: {
                handler(newVal, oldVal) {
                    this.content = newVal;
                }
            }
        },
        data: function(){
            return {
                content:this.contentsb,
                html:'',
                configs: {
                },
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);

                mdupload02(formdata).then(res => {
                  /*  console.log(res.newFileName);*/
                    let url = "static/images/goodsinfo/"+res.oldFileName;
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)，也就是回显
                    this.$refs.md.$img2Url(pos, url);

                    mdupload(formdata).then(res => {
                    })
                    mdupload03Totarget(formdata).then(res => {
                    })
                    mdupload04Tofront(formdata).then(res => {
                    })
                })

            },
            $imgDel(pos){
                var formdata = new FormData();
                formdata.append('delete', "static/images/goodsinfo/"+pos[1].name);
                deleteGoodsColorimg(formdata).then(res => {
                })

            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
                // 触发父组件中的事件，并传递参数
                this.$emit('getDatasb',render);
            },

        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>
