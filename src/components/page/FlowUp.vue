<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 企业管理</el-breadcrumb-item>
                <el-breadcrumb-item> 跟进信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row>
                <el-col :span="14">
                    <el-form ref="crmForm" :model="crmForm" label-width="80px">
                        <el-form-item label="机会来源"><el-input v-model="crmForm.infoFrom"></el-input></el-form-item>
                        <el-form-item label="企业类型"><el-input v-model="crmForm.customerType"></el-input></el-form-item>
                        <el-form-item label="来源部门"><el-input v-model="crmForm.firstDepartName"></el-input></el-form-item>
                        <el-form-item label="来源人"><el-input v-model="crmForm.firstPersonName"></el-input></el-form-item>
                        <el-form-item label="客户名称"><el-input v-model="crmForm.customerName"></el-input></el-form-item>
                        <el-form-item label="联系人"><el-input v-model="crmForm.contactName"></el-input></el-form-item>
                        <div>
                            <el-form-item label="联系电话"><el-input v-model="crmForm.contactTel"></el-input></el-form-item>
                            <el-button type="success"><i class="el-icon-phone"></i> 拨打电话</el-button>
                        </div>

                        <el-form-item label="选择器">
                            <el-select v-model="crmForm.region" placeholder="请选择">
                                <el-option key="bbk" label="步步高" value="bbk"></el-option>
                                <el-option key="xtc" label="小天才" value="xtc"></el-option>
                                <el-option key="imoo" label="imoo" value="imoo"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期时间">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="crmForm.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker placeholder="选择时间" v-model="crmForm.date2" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="选择开关">
                            <el-switch v-model="crmForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="多选框">
                            <el-checkbox-group v-model="crmForm.type">
                                <el-checkbox label="步步高" name="type"></el-checkbox>
                                <el-checkbox label="小天才" name="type"></el-checkbox>
                                <el-checkbox label="imoo" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="单选框">
                            <el-radio-group v-model="crmForm.resource">
                                <el-radio label="步步高"></el-radio>
                                <el-radio label="小天才"></el-radio>
                                <el-radio label="imoo"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="文本框">
                            <el-input type="textarea" rows="5" v-model="crmForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">表单提交</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
            <div class="btn-box">
                <el-button type="primary" @click="goBack">返回</el-button>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                crmForm:{}
            }
        },
        created(){
            this.crmForm = this.$route.query;
        },
        methods: {

            onSubmit() {
                this.$message.success('提交成功！');
            },
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>


<style lang="scss" scoped>

    .el-form-item{
        width:49%;
        display: inline-block;
    }
</style>