<template>
    <div>
       <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>-->
        <div class="container">
            <!--<img src="static/images/3a5bc7fa-058f-46c4-ba18-b9d49afff09f.jpg">-->
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除qq</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option v-for="item in selectRoleList" :key="item.id" :lable="item.id" :value="item.name"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button id="search" type="primary" icon="el-icon-search" @click="handleSearch" style="background: #409EFF" >搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                style="width: 100%"
                height="500px"
                size="mini"
                v-loading="loading"
                :row-style="{height:'0px'}"
                :cell-style="{padding:'1px'}"
            >
                <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
                <el-table-column prop="id" label="ID" width="70" align="center" fixed="left"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column label="账户余额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center" width="200px">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.imgurl"
                            :preview-src-list="[scope.row.imgurl]"
                        ></el-image>
                    </template>
                </el-table-column>
<!--
                <el-table-column prop="address" label="地址"></el-table-column>
-->
                <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')">{{scope.row.state}}</el-tag>
                </template>
                </el-table-column>

                <el-table-column prop="name" label="注册时间" width="200px"></el-table-column>
                <el-table-column prop="date" label="注册时间" width="200px"></el-table-column>
                <el-table-column prop="date" label="注册时间" width="200px"></el-table-column>
                <el-table-column prop="date" label="注册时间" width="200px"></el-table-column>
                <el-table-column label="操作" width="160" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
    </span>
    </el-dialog>
    </div>
    </template>

    <script>
    import { getlist } from '../../api/index'

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 20
            },
            /*装下拉框的属性*/
            selectRoleList:[{id: 1, name: '奔驰1'}],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            /*控制加载动画的变量默认开始*/
            loading: true
        };

    },

    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            /*传到后台的参数*/
            let param = new URLSearchParams();
            param.append("page", this.query.pageIndex);
            param.append("name", this.query.name);

            getlist(param).then(res => {
                this.tableData = res.data;//把传回来数据赋给表格
               /* /!*控制加载动画的变量停止*!/*/
                this.loading = false;
               console.log(res.data)
            })
           /* this.$axios.get('/getEmpList', {params:param})
            //res是回调返回的数据,then是回调函数
                .then((res) => {
                this.tableData = res.data.data;//把传回来数据赋给表格
                this.pageTotal = res.data.total;//分页总数量

                this.selectRoleList = res.data.politicsstatusList;//赋值下拉框

                console.log(this.tableData)
                console.log(res.data.politicsstatusList)
                 /!*控制加载动画的变量停止*!/
                this.loading = false;
            }).catch(function(error){
                console.log(error);
            })*/

        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            /*控制加载动画的变量默认开始*/
            this.loading=true;
            this.$set(this.query, 'pageIndex', val);
            this.getData();

        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
    margin-top: -20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
    margin-top: -15px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

</style>
