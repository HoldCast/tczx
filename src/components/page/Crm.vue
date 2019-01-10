<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 企业管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="add">添加用户</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="zh" label="账号"></el-table-column>
                <el-table-column prop="xm" label="姓名"></el-table-column>
                <!--<el-table-column prop="mm" label="密码"></el-table-column>-->
                <el-table-column prop="gsid" label="公司ID" :formatter="formatterGS"></el-table-column>
                <el-table-column prop="cjsj" label="创建时间"></el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {}
        },
        computed: {
        },
        created(){
        },
        activated(){
        },
        deactivated(){
        },
        methods: {
        }
    }

</script>


<style lang="scss" scoped>

</style>
