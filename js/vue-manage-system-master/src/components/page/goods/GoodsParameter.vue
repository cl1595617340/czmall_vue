<template>
    <div id="ParameterDiv" style="margin-left: -20px" >
        <el-dialog width="90%"  height="90%" :title="othertitle" :visible.sync="dialogFormVisible" :before-close="cloesParameter">
            <el-form :model="form" style="margin-left: -40px">

                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">物理规格</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="高度:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterHeight" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item class="form_item" label="宽度:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterWidth" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item class="form_item" label="厚度:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterThickness" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item class="form_item" label="重量:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterWeight" autocomplete="off"></el-input>
                        </el-form-item>

                    </div>
                </el-card>


                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">上市时间</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="上市时间:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterShowtime" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-card>

                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">处理器</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="CPU型号:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterCpu" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item class="form_item" label="CPU核心数:" :label-width="formLabelWidth" style="width: 280px;margin-left: 10px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterCpunum" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-card>

                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">电池信息</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="电池容量:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterCell" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-card>

                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">屏幕显示</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="尺寸(英寸):" :label-width="formLabelWidth" style="width: 280px;">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterSize" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="form_item" label="分辨率:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterDistinguishability" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="form_item" label="触摸屏:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterTouch" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item class="form_item" label="屏幕类型:" :label-width="formLabelWidth" style="width: 280px;margin-left: 0px">
                            <el-select style="width: 200px" v-model="form.parameter_screen" placeholder="请选择">
                                <el-option
                                        v-for="item in screenlist"
                                        :key="item.text"
                                        :label="item.text"
                                        :value="item.text">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-card>

                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">拍摄功能</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="前置摄像头像素:" :label-width="formLabelWidth" style="width: 280px;margin-left: 30px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterFrontpixel" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="form_item" label="后置摄像头数量:" :label-width="formLabelWidth" style="width: 280px;margin-left: 100px">
                            <el-input @keyup.enter.native="submit()" autosize type="textarea" style="width: 200px" v-model="form.parameterLaternumcameras" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="form_item" label="后置闪光灯:" :label-width="formLabelWidth" style="width: 280px;margin-left: 50px">
                            <el-select style="width: 200px" v-model="form.parameterLaterflashlight" placeholder="请选择">
                                <el-option
                                        v-for="item in optionstype"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                      <!--  <el-form-item class="form_item" label="自动对焦:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input style="width: 200px" v-model="form.parameterAutofocusing" autocomplete="off"></el-input>
                        </el-form-item>-->

                        <el-form-item class="form_item" label="自动对焦:" :label-width="formLabelWidth" style="width: 280px;margin-left: 30px">
                            <el-select style="width: 200px" v-model="form.parameterAutofocusing" placeholder="请选择">
                                <el-option
                                        v-for="item in optionstype"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item class="form_item" label="拍摄模式:" :label-width="formLabelWidth" style="width: 280px;;margin-left: 100px">
                            <el-input @keyup.enter.native="submit()" autosize type="textarea" style="width: 200px" v-model="form.parameterRecmode" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-card>


                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">音乐与音响</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="MP3铃声:" :label-width="formLabelWidth" style="width: 280px;">
                            <el-select style="width: 200px" v-model="form.parameterMp3ringtone" placeholder="请选择">
                                <el-option
                                        v-for="item in optionstype"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-card>


                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">指纹识别</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="指纹识别:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterFingerprintrecognition" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-card>


                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">操作系统</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="操作系统:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" autosize type="textarea" style="width: 200px" v-model="form.parameterOs" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-card>


                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">网络参数</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="网络类型:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterNetworktype" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="form_item" label="双卡使用说明:" :label-width="formLabelWidth" style="width: 280px;margin-left: 30px">
                            <el-input @keyup.enter.native="submit()" style="width: 200px" v-model="form.parameterNeworkinstructions" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-card>


                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">数据连接</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="WLAN:" :label-width="formLabelWidth" style="width: 280px;">
                            <el-input @keyup.enter.native="submit()" autosize type="textarea"  style="width: 200px" v-model="form.parameterWlan" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item class="form_item" label="蓝牙传输:" :label-width="formLabelWidth" style="width: 280px;">
                            <el-select style="width: 200px" v-model="form.parameterBluetooth" placeholder="请选择">
                                <el-option
                                        v-for="item in optionstype"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item class="form_item" label="OTG:" :label-width="formLabelWidth" style="width: 280px;">
                            <el-select style="width: 200px" v-model="form.parameterOtg" placeholder="请选择">
                                <el-option
                                        v-for="item in optionstype"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-card>


                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">传感器</span>
                    </div>
                    <div style="margin-left: -45px">

                        <el-form-item class="form_item" label="重力感应器:" :label-width="formLabelWidth" style="width: 280px;">
                            <el-select style="width: 200px" v-model="form.parameterGravitysensor" placeholder="请选择">
                                <el-option
                                        v-for="item in optionstype"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item class="form_item" label="光敏感应器:" :label-width="formLabelWidth" style="width: 280px;margin-left: 30px">
                            <el-select style="width: 200px" v-model="form.parameterPhotosensitivesensor" placeholder="请选择">
                                <el-option
                                        v-for="item in optionstype"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-card>



                <el-card class="box-card" shadow="hover" style="width: 95%;margin-left:50px;margin-top: 40px">
                    <div slot="header" class="clearfix">
                        <span class="box-card_span">内置应用</span>
                    </div>
                    <div style="margin-left: -45px">
                        <el-form-item class="form_item" label="社交:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" autosize type="textarea" style="width: 200px" v-model="form.parameterSns" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item @keyup.enter.native="submit()" class="form_item" label="影视音乐:" :label-width="formLabelWidth" style="width: 280px;">
                            <el-input autosize type="textarea" style="width: 200px" v-model="form.parameterMovieandtv" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="form_item" label="常用工具:" :label-width="formLabelWidth" style="width: 280px">
                            <el-input @keyup.enter.native="submit()" autosize type="textarea" style="width: 200px" v-model="form.parameterTools" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="form_item" label="生活:" :label-width="formLabelWidth" style="width: 280px;">
                            <el-input @keyup.enter.native="submit()" autosize type="textarea" style="width: 200px" v-model="form.parameterLive" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cloesParameter">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import { updateParameter } from '../../../api/goods'
    import { addParameter } from '../../../api/goods'
    export default {
        data(){
          return{
              dialogFormVisible: this.isVisiblesb,
              formLabelWidth: '120px',
              /*支持和不支持的下拉框*/
              optionvalue:"",
              optionstype:[
                  {value:0,text:"支持"},
                  {value:1,text:"不支持"},
              ],
              screenlist:[
                  {text:"全面屏"},
                  {text:"OLED屏幕"},
                  {text:"双曲面"},
              ]
          }
        },
        methods: {
            submit(){
                let formDatas = new FormData();
                formDatas.append("obj", JSON.stringify(this.form));

                //如果参数id是undefined,就说明这个手机没有添加参数数据
                if (this.form.parameterId==undefined){
                    addParameter(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '新增成功!',
                                duration:2000
                            });
                            // 触发父组件中的事件，并传递参数
                            this.$emit('getDatasb',true);
                            this.cloesParameter();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '新增失败!',
                                duration:2000
                            });
                        }
                    })
                } else {
                     updateParameter(formDatas).then(res => {
                       if (res){
                           this.$message({
                               type: 'success',
                               message: '编辑成功!',
                               duration:2000
                           });

                           this.cloesParameter();
                       } else {
                           this.$message({
                               type: 'error',
                               message: '编辑失败!',
                               duration:2000
                           });
                       }
               })
                };

            },
            //关闭窗口
            cloesParameter(){

                // 触发父组件中的dialogVisibleEvent事件，并传递参数
                this.$emit('dialogVisibleEvent', false);
            },
        },
        props: {
            isVisiblesb:false,
            othertitle:"",
            form: {},
        },
        watch: {
            isVisiblesb: {
                handler(newVal, oldVal) {
                    this.dialogFormVisible = newVal;
                }
            }
        },
    };
</script>

<style scoped>
    .el-card{
        background: #F0F0F0;
    }
    .el-card:hover{
        box-shadow:0px 4px 10px #888888;
    }

.box-card_span{
    display: block;
    font: normal 400 16px/10px "SimSun", serif;
    transform: scale(1, 1.4);
    position: relative;

}
.form_item{
    float: left;
}
</style>
