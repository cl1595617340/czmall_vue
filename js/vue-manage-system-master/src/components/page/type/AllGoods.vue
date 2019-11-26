<template>
    <!-- multiple多个文件上传 accept文件类型-->
    <input
            type="file"
            @change="addFile"
            ref="inputer"
            accept="application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
    >
</template>
<script>
    export default {
        data() {
            return {
                formData: new FormData(),
                file: {}, //文件数据
            }
        },
        methods: {
            //上传文件
            addFile: function() {
                var _this = this;
                let inputDOM = this.$refs.inputer;
                // let oldLen = this.filLen;
                this.file = inputDOM.files[0];
                let len = this.file.length;
                let size = Math.floor(this.file.size / 1024);
                if (size > 20 * 1024 * 1024) {
                    alert("请选择20M以内的图片！");
                    return false;
                }
                console.log(this.file)
                this.formData.append("file", this.file);
                this.$axios({
                    method: "post",
                    url: "/admin/type/goodstype/upload",
                    data: this.formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(function(res) {
                    })
                    .catch(function(err) {
                        console.log("新建分享", err);
                    });

                this.$axios({
                    method: "post",
                    url: "/admin/type/goodstype/upload02",
                    data: this.formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(function(res) {
                    })
                    .catch(function(err) {
                        console.log("新建分享", err);
                    });
            }


        }
    }



</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
