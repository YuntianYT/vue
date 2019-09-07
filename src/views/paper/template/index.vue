<template>
    <div class="dashboard-container">
        <el-container style="height: 800px">
            <el-header style="height:10%; width: 100%">
                <el-row style="height:50%">
                    模版名：<el-input size="mini" style="width: 10%" v-model="templateQueryName" />&nbsp;
                    组卷时间: <el-date-picker
                    v-model="combExamTimeSelect"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2"
                />&nbsp;
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
                </el-row>
                <el-row style="display: inline">
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete">删除</el-button>
                    <el-button type="success" size="mini" icon="el-icon-edit" @click="handleModify">修改</el-button>
                    <el-button type="info" size="mini" icon="el-icon-info" @click="handleInfo">详情</el-button>
                </el-row>
            </el-header>
            <!-- 默认显示试卷列表 -->
            <el-main v-if="show">
                <el-table :data="templateVos" border style="width: 100%" height="70%" @selection-change="handlePaperSelectionChange">
                    <el-table-column type="selection" width="30%" />
                    <el-table-column prop="templateName" label="模版名称" />
                    <el-table-column prop="templateCreator" label="修改人" />
                    <el-table-column prop="templateCompany" label="所属公司" />
                    <el-table-column prop="templateUpdateTime" label="修改时间" />
                    <el-table-column prop="templateStatus" label="启用标志" />
                    <el-table-column prop="templateComment" label="备注" />
                    <el-table-column prop="templateDownloadTimes" label="下载次数" />
                    <el-table-column label="操作" width="150%">
                        <template>
                            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="handleDelete" />
                            <el-button type="success" icon="el-icon-edit" size="mini" circle @click="handleModify"/>
                            <el-button type="info" icon="el-icon-info" size="mini" circle @click="handleInfo"/>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <span class="demonstration" />
                    <el-pagination layout="prev, pager, next" :total="50"/>
                </div>
            </el-main>

        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Position',
        data() {
            return {
                //查询对象
                templateQueryName:'',

                //日期选项
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
                // 组卷查询日期区间,实际上是一个数组
                combExamTimeSelect: '',
                optionVal: '',
                //机构的试卷
                templateVos: [
                    {
                        templateVoId:'51251759259125',
                        templateName: 'java基础题',
                        templateCreator: 'aaron',
                        templateCompany: 'alibaba',
                        templateUpdateTime: '2019-8-20',
                        templateStatus: '1' ,
                        templateComment: '很简单的JAVA测试',
                        templateDownloadTimes: '20' ,
                    },
                    {
                        templateVoId:'263359259125',
                        templateName: 'C基础题',
                        templateCreator: 'aaron',
                        templateCompany: 'alibaba',
                        templateUpdateTime: '2019-8-20',
                        templateStatus: '1' ,
                        templateComment: '很简单的JAVA测试',
                        templateDownloadTimes: '20' ,
                    },
                ],
                //显示试卷表
                show: true,
                //选择框
                selected: '',
            }
        },
        mounted() {
        },
        methods: {

            handlePaperSelectionChange(selection) {
                this.selected = selection;
            },
            handleQuery(){
                if (this.combExamTimeSelect==''&&this.templateQueryName==''){
                    alert("必须至少填一项进行查询");
                }else {
                    alert(this.combExamTimeSelect+this.templateQueryName);
                }

            },
            handleDelete(){
                if (this.selected.length==0){
                    alert("至少选择一项进行删除");
                }else{
                    var ids = [];
                    for (var i=0;i<this.selected.length;i++){
                        ids.push(this.selected[i].templateVoId);
                    }
                    alert("删除成功"+ids);
                }
            },
            handleModify(){
                if (this.selected.length!=1){
                    alert("有且仅有一份记录能被选择");
                }else {
                    this.showEdit = true;
                    alert("修改成功"+this.selected[0].templateVoId);
                }
            },
            handleInfo(){
                if (this.selected.length!=1){
                    alert("有且仅有一份记录能被选择");
                }else {
                    alert("信息"+this.selected[0].templateVoId);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
