<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 企业管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row>
                <el-col :span="7">
                    <el-radio-group v-model="customerType" size="small">
                        <el-radio-button label="1">我跟进的客户</el-radio-button>
                        <el-radio-button label="2">我贡献的销售机会</el-radio-button>
                        <el-radio-button label="3">客户公海</el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :span="5">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <el-button type="success" @click="addData">添加企业</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="container">

            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="infoFrom" label="机会来源"></el-table-column>
                <el-table-column prop="customerType" label="客户类型"></el-table-column>
                <el-table-column prop="customerName" label="客户名称"></el-table-column>
                <el-table-column prop="contactTel" label="客户电话"></el-table-column>
                <el-table-column prop="salesOppoStatus" label="客户意向"></el-table-column>
                <el-table-column prop="firstPersonName" label="来源人"></el-table-column>
                <el-table-column prop="firstDepartName" label="来源部门"></el-table-column>
                <el-table-column prop="contactName" label="联系人"></el-table-column>
                <el-table-column prop="followingPersonName" label="跟进人员"></el-table-column>
                <el-table-column prop="saleCategory" label="销售类别"></el-table-column>

                <!--
                "customerType": "字典项，此处固定值：企业",
                "customerPid": "客户信息表中的Pid，可为空",
                "customerName": "客户信息表中的客户名称，可为空",
                "contactName": "联系人姓名",
                "contactTel": "联系人真实电话",
                "saleCategory": "字典项，此处固定值：人才",
                "salesOppoStatus": "字典项，字典代码salesOppoStatuses：例如30%",
                "infoFrom": "字典项，字典代码sosinfoFrom，例如自行开拓",
                "firstPersonPid": "来自人员Pid",
                "firstDepartPid": "来自部门Pid",
                "firstPersonName": "来源人员姓名",
                "firstDepartName": "来源部门名称",
                "followingPersonPid": "当前跟进人员Pid",
                "followingPersonName": "跟进人员姓名",
                "comments": "备注",
                "orgPid": "单位Pid"
                -->

                <el-table-column label="操作" width="255"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleFlowUp(scope.$index, scope.row)">跟进</el-button>
                        <el-button type="text" icon="el-icon-circle-plus-outline" @click="handleAddPerson(scope.$index, scope.row)">添加参与人</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">放弃</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-nation">
                <el-pagination background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[5, 10, 20, 50]"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalPages">
                </el-pagination>
            </div>
            <el-button type="primary" @click="switchRouter">切换路由</el-button>
            <el-button type="primary" @click="processVisible = true">进度条</el-button>
            <el-button type="primary" @click="oPenDrawer">抽屉</el-button>

        </div>

        <!-- 企业信息弹出框 -->
        <el-dialog :title="modelTitle" :visible.sync="modelVisible">
            <el-form :model="formData" label-width="100px" >
                <el-form-item label="客户类型"><el-input v-model="formData.customerType"></el-input></el-form-item>
                <el-form-item label="客户名称"><el-input v-model="formData.customerName"></el-input></el-form-item>
                <el-form-item label="客户意向"><el-input v-model="formData.salesOppoStatus"></el-input></el-form-item>
                <el-form-item label="信息来源"><el-input v-model="formData.infoFrom"></el-input></el-form-item>
                <el-form-item label="来源人"><el-input v-model="formData.firstPersonName"></el-input></el-form-item>
                <el-form-item label="联系人"><el-input v-model="formData.contactName"></el-input></el-form-item>
                <el-form-item label="联系电话"><el-input v-model="formData.contactTel"></el-input></el-form-item>
                <el-form-item label="销售类别"><el-input readonly v-model="formData.saleCategory"></el-input></el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="modelVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveData">确 定</el-button>
            </div>
        </el-dialog>


        <!--添加参与人-->
        <el-dialog title="添加参与人" :visible.sync="personVisible">
            <div class="handle-box">
                <el-input class="person-search" placeholder="请输入姓名">
                </el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <el-table :data="personData" border>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="phone" label="电话" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-roundadd" @click="handleAddPersonBtn(scope.$index, scope.row)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="personVisible = false">关 闭</el-button>
            </div>
        </el-dialog>


        <!-- 进度条弹出框 -->
        <el-dialog title="进度" :visible.sync="processVisible" width="80%">

            <el-steps :active="5" align-center>
                <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="<h3>111</h3>"></el-step>
                <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="<h3>111</h3>"></el-step>
            </el-steps>

            <div slot="footer" class="dialog-footer">
                <el-button @click="processVisible = false">取 消</el-button>
            </div>

        </el-dialog>

        <Drawer title="跟进历史" :closable="false" v-model="drawer">
            <div style="height:1000px;">
                <el-steps :active="5" direction="vertical" align-center>
                    <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤4" description="<h3>111</h3>"></el-step>
                    <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="步骤4" description="<h3>111</h3>"></el-step>
                </el-steps>
            </div>

        </Drawer>
    </div>
</template>

<script>
    import { Drawer } from 'iview';
    export default {
        name: 'dashboard',
        data() {
            return {
                personVisible: false,
                customerType: 1,
                drawer: false,
                saveStatus: 'add',
                tableData:[],
                personData:[],
                currentPage:1,
                pageSize:5,
                totalPages: 0,
                modelTitle: '添加企业',
                modelVisible: false,
                processVisible: false,
                formData: {
                    "customerType": "字典项，此处固定值：企业",
                    "customerPid": "客户信息表中的Pid，可为空",
                    "customerName": "客户信息表中的客户名称，可为空",
                    "contactName": "联系人姓名",
                    "contactTel": "联系人真实电话",
                    "saleCategory": "字典项，此处固定值：人才",
                    "salesOppoStatus": "字典项，字典代码salesOppoStatuses：例如30%",
                    "infoFrom": "字典项，字典代码sosinfoFrom，例如自行开拓",
                    "firstPersonPid": "来自人员Pid",
                    "firstDepartPid": "来自部门Pid",
                    "firstPersonName": "来源人员姓名",
                    "firstDepartName": "来源部门名称",
                    "followingPersonPid": "当前跟进人员Pid",
                    "followingPersonName": "跟进人员姓名",
                    "comments": "备注",
                    "orgPid": "单位Pid"
                }
            }
        },
        components:{
            Drawer
        },
        computed: {
        },
        created(){
        },
        mounted(){
            this.getCompanyInfo();
        },
        methods: {
            getCompanyInfo(){
                var param = {
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    order: 0
                };
                var paramQs = this.$qs.stringify(param);
                this.$axios({
                    method: 'get',
                    url: 'huiwcrm/salesOpportunity/count/',
                    data: param,
                }).then(res=>{
                    this.totalPages = res.data;
                });
                this.$axios.get('huiwcrm/salesOpportunity/', {params:param}).then( (res) => {
                    console.log(res)
                    this.tableData = res.data;
                });

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getCompanyInfo();

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getCompanyInfo();
            },
            handleSelectionChange(){

            },
            handleEdit(index, row){
                console.log(index, row);
                this.modelVisible = true;
                this.saveStatus = 'edit';
                this.formData = Object.assign({}, row);
            },
            //跟进
            handleFlowUp(index, row){
                this.$router.push({ path: '/flowUp', query: row});
            },
            //添加参与人
            handleAddPerson(index, row){
                this.personVisible = true;
            },
            handleDelete(index, row){
                console.log(index, row);
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {});
            },
            addData(){
                this.modelVisible = true;
                this.saveStatus = 'add';
                this.formData = {};
            },
            saveData(){
                let saveUrl = 'huiwcrm/salesOpportunity/';
                let saveStatus = this.saveStatus;
                let method = 'post';
                if(saveStatus == 'edit'){
                    method = 'put';
                }

                this.$axios({
                    method: method,
                    url: 'huiwcrm/salesOpportunity/',
                    data: this.formData,
                }).then(res=>{
                    this.currentPage = 1;
                    this.getCompanyInfo();
                    this.modelVisible = false;

                });
            },
            switchRouter(){
                this.$router.push('/form2')
            },
            oPenDrawer(){
                this.drawer = true;
            }
        }
    }

</script>


<style lang="scss" scoped>
    .el-form-item{
        width:49%;
        display: inline-block;
    }
    .person-search{
        display: inline-block;
        width:300px;
    }

</style>
