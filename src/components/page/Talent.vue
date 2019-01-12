<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 人才管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">筛选</div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="addData">添加企业</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="customerType" label="客户类型"></el-table-column>
                <el-table-column prop="customerName" label="客户名称"></el-table-column>
                <el-table-column prop="salesOppoStatus" label="客户意向"></el-table-column>
                <el-table-column prop="infoFrom" label="信息来源"></el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-nation">
                <el-pagination background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[1, 2, 3, 4]"
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
                <el-form-item label="客户类型">
                    <el-input v-model="formData.customerType"></el-input>
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input v-model="formData.customerName"></el-input>
                </el-form-item>
                <el-form-item label="客户意向">
                    <el-input v-model="formData.salesOppoStatus"></el-input>
                </el-form-item>
                <el-form-item label="信息来源">
                    <el-input v-model="formData.infoFrom"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="modelVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveData">确 定</el-button>
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
                drawer: false,
                saveStatus: 'add',
                tableData:[],
                currentPage:1,
                pageSize:2,
                totalPages: 4,
                modelTitle: '添加企业',
                modelVisible: false,
                processVisible: false,
                formData: {

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

                this.$axios.get('api/huiwcrm/salesOpportunity/', {params:param}).then( (res) => {
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
                alert(this.saveStatus);
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

</style>
