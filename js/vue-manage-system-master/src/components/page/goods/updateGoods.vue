<template>
   <div>
       <el-dialog :title="othertitle" :visible.sync="editVisible" width="80%"  :before-close="cloesParameter">

           <div style="margin-top: -20px"  v-show="editVisiblesteps">
               <el-steps :active="1" align-center>
                   <el-step title="步骤1" description="新增商品的基本信息"></el-step>
                   <el-step title="步骤2" description="在商品管理里新增商品的版本,展示图,参数等信息"></el-step>
                   <el-step title="步骤3" description="前台商城渲染展示"></el-step>
               </el-steps>
           </div>



           <el-form ref="form" :model="form" style="margin-left: -40px;margin-top: 60px" :rules="rules">


               <el-form-item class="form_item" label="商品名:" :label-width="formLabelWidth" prop="goodsName" style="width: 280px;margin-left: 50px">
                   <el-input @keyup.enter.native="goPost()" style="width: 200px" v-model="form.goodsName" placeholder="请输入商品名" ></el-input>
               </el-form-item>


               <el-form-item class="form_item" label="库存:" :label-width="formLabelWidth" style="width: 280px;margin-left: 50px" prop="goodsRepertory">
                   <el-input @keyup.enter.native="goPost()" style="width: 200px" v-model="form.goodsRepertory" placeholder="请输入容量" ></el-input>
               </el-form-item>


               <el-form-item class="form_item" label="商品简介:" :label-width="formLabelWidth" prop="goodsDescribe" style="width: 280px;margin-left: 50px">
                   <el-input @keyup.enter.native="goPost()" style="width: 200px" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.goodsDescribe" placeholder="请输入商品简介" ></el-input>
               </el-form-item>


               <el-form-item class="form_item"  label="所属3级分类:" :label-width="formLabelWidth"  style="width: 280px;margin-left: 50px">
                   <el-select @keyup.enter.native="goPost()" style="width: 200px;z-index: 10" v-model="form.goodsType3Id" placeholder="请选择">
                       <el-option
                               v-for="item in goodstype3"
                               :key="item.goodstype3Id"
                               :label="item.goodstype3Name"
                               :value="item.goodstype3Id">
                       </el-option>
                   </el-select>
               </el-form-item>


               <el-form-item class="form_item" label="商品说明:" :label-width="formLabelWidth" prop="goodsExplain" style="width: 280px;margin-left: 50px">
                   <el-input @keyup.enter.native="goPost()" style="width: 200px;z-index: 10" type="textarea" autosize v-model="form.goodsExplain" placeholder="请输入商品说明" ></el-input>
               </el-form-item>

               <el-form-item class="form_item" label="主页小标题:" :label-width="formLabelWidth" prop="goodsExplain" style="width: 280px;margin-left: 50px">
                   <el-input @keyup.enter.native="goPost()" style="width: 200px;z-index: 10"  autosize v-model="form.goods_title" placeholder="请输入主页小标题" ></el-input>
               </el-form-item>


               <el-form-item class="form_item" label="花呗:" :label-width="formLabelWidth" style="width: 280px;margin-left: 50px">
                   <el-select style="width: 200px" v-model="form.goods_loans" placeholder="请选择">
                       <el-option
                               v-for="item in optionstype"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </el-form-item>

               <el-form-item class="form_item" label="以旧换新:" :label-width="formLabelWidth" style="width: 280px;margin-left: 50px">
                   <el-select style="width: 200px" v-model="form.goods_oldToNew" placeholder="请选择">
                       <el-option
                               v-for="item in optionstype"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </el-form-item>

               <el-form-item class="form_item" label="赠品:" :label-width="formLabelWidth" style="width: 280px;margin-left: 50px">
                   <el-select style="width: 200px" v-model="form.goods_complimentary" placeholder="请选择">
                       <el-option
                               v-for="item in optionstype"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </el-form-item>


               <div style="position: relative;top: 195px;left: -925px">
                   <label>商品详情:</label>
               </div>

                   <!-------------------------富文本------------------->
               <vMarkdown :contentsb="form.goodsInfo" @getDatasb="getDataGoodsinfo" :goodsname="form.goodsName"></vMarkdown>
           </el-form>

           <span slot="footer" class="dialog-footer" style="margin-top: 50px">
                <el-button style="margin-top: 30px;" @click="cloesParameter">取 消</el-button>
                <el-button type="primary" @click="goPost">确 定</el-button>
            </span>


       </el-dialog>
   </div>
</template>

<script>
    import { updateGoods } from '../../../api/goods'
    import { addGoods } from '../../../api/goods'

    import vMarkdown from '../Markdown'
    export default {
        components: {
            "vMarkdown": vMarkdown,
        },
        data(){
            return{
                editVisible: this.isVisiblesb,
                formLabelWidth: '120px',
                //富文本回显
                content:"",
                goodsinfo:"",
                rules:{
                    goodsName: [{ required: true, message: '请输入商品名', trigger: 'blur' },],
                    goodsRepertory: [{ required: true, message: '请输入库存', trigger: 'blur' },],
                    goodsDescribe: [{ required: true, message: '请输入商品简介', trigger: 'blur' },],
                },
                optionstype:[
                    {value:0,text:"支持"},
                    {value:1,text:"不支持"},
                ],

            }
        },

        methods:{
            goPost(){
                let formDatas = new FormData();
                this.$set( this.form, "goodsInfo", this.goodsinfo)
                formDatas.append("obj", JSON.stringify(this.form));
                if (this.type=="update"){
                    updateGoods(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '编辑成功!',
                                duration:2000
                            });
                            // 触发父组件中的事件，并传递参数
                            this.$emit('getDatasb',true);
                            this.cloesParameter();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '编辑失败!',
                                duration:2000
                            });
                        }
                    })
                } else {
                    addGoods(formDatas).then(res => {
                        if (res){
                            this.$notify({
                                title: '商品新增成功',
                                message: '请在商品管理里新增商品的版本,展示图,参数等信息',
                                type: 'success'
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
                };

            },
            /*富文本子组件传来的html*/
            getDataGoodsinfo(html){
                this.goodsinfo = html;
            },
            //关闭窗口
            cloesParameter(){
                this.editVisible = false;
                // 触发父组件中的dialogVisibleEvent事件，并传递参数
                this.$emit('dialogVisibleEvent', false);
            },
        },
        props: {
            isVisiblesb:false,
            othertitle:"",
            form: {},
            goodstype3:{},

            /*判断是新增还是修改*/
            type:"",
            /*步骤条的显示*/
            editVisiblesteps:false,
        },
        watch: {
            isVisiblesb: {
                handler(newVal, oldVal) {
                    this.editVisible = newVal;
                }
            }
        },
    };
</script>

<style scoped>
    .form_item{
        float: left;
    }
</style>
