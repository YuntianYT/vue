<template>
    <div class="dashboard-container">
    <el-container style="height: 800px">
        <el-header style="height:10%; width: 100%">
        <el-row style="height:50%" v-if="showSelectBar">
            试卷名：<el-input size="mini" style="width: 10%" v-model="paperName" />&nbsp;
            组卷人：<el-input size="mini" style="width: 10%" v-model="creator"/>&nbsp;
            难度：<el-select v-model="optionVal" placeholder="可选项" size="mini" style="width: 10%" value="">&nbsp;
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
            </el-select>
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
            <el-button type="success" size="mini" icon="el-icon-document" @click="handleFastGen">快速组卷</el-button>
            <el-button type="primary" size="mini" icon="el-icon-document" @click="normalGen">标准组卷</el-button>
            <el-button type="warning" size="mini" icon="el-icon-document" @click="handleTemplateGen">模版组卷</el-button>
            <el-button type="info" v-if="showPaperInf" size="mini" icon="el-icon-info" @click="showPaperInfo">试卷详情</el-button>
            <el-button type="info" v-if="showReturn" size="mini" icon="el-icon-info" @click="returnParent">返回上级</el-button>
        </el-row>
        </el-header>
        <!-- 默认显示试卷列表 -->
        <el-main v-if="show">
        <el-table :data="paperVos" border style="width: 100%" height="90%" @selection-change="handlePaperSelectionChange">
            <el-table-column type="selection" width="30%" />
            <el-table-column prop="paperSubject" label="题目" />
            <el-table-column prop="paperCreator" label="组卷人" />
            <el-table-column prop="paperType" label="试卷类型" />
            <el-table-column prop="paperDifficulty" label="试卷难度" />
            <el-table-column prop="paperCombExamTime" label="组卷时间" />
            <el-table-column prop="paperScore" label="试卷总分" />
            <el-table-column prop="paperDescription" label="试卷描述" />
            <el-table-column prop="paperStatus" label="状态" />
            <el-table-column label="操作" width="200%">
            <template>
                <el-button type="primary" icon="el-icon-edit" size="mini" circle />
                <el-button type="success" icon="el-icon-check" size="mini" circle />
                <el-button type="warning" icon="el-icon-star-off" size="mini" circle />
                <el-button type="danger" icon="el-icon-delete" size="mini" circle />
            </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <span class="demonstration" />
            <el-pagination layout="prev, pager, next" :total="50"/>
        </div>
        </el-main>
        <!-- 点击快速组卷后显示此部分 -->
        <el-main v-if="showFastGen">
            <el-table :data="combExamConfigVos" border style="width: 100%" height="90%" @selection-change="handlePaperSelectionChange">
                <el-table-column type="selection" width="30%" />
                <el-table-column prop="combExamConfigName" label="配置项" >
                </el-table-column>
                <el-table-column prop="difficulty" label="难度" />
                <el-table-column prop="updatedBy" label="修改人" />
                <el-table-column prop="updateTime" label="修改时间" sortable=""/>
                <el-table-column prop="company" label="公司" />
                <el-table-column prop="combExamConfigNameCommit" label="备注" />
                <el-table-column label="操作" width="50%">
                    <template>
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleDetail()" circle />
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <span class="demonstration" />
                <el-pagination
                    layout="prev, pager, next"
                    :total="50"
                />
            </div>
        </el-main>
        <!-- 组卷配置明细 -->
        <el-main v-if="showConfigDetail">
            <el-table :data="combExamConfigDetailVos" border style="width: 100%" height="90%" element-loading-text="Loading" @selection-change="handlePaperSelectionChange">
                <el-table-column type="selection" width="30%" />
                <el-table-column prop="combExamConfigDetailName" label="题目类型" />
                <el-table-column prop="combExamConfigDetailSubjectType" label="题型" />
                <el-table-column prop="combExamConfigDetailSubjectAmount" label="题目数量" />
                <el-table-column prop="combExamConfigDetailSubjectDifficulty" label="题目难度" />
                <el-table-column prop="combExamConfigDetailSubjectScore" label="题目分值" />
                <el-table-column label="操作" width="200%">
                    <template>
                        <el-button type="primary" icon="el-icon-edit" size="mini" circle />
                        <el-button type="success" icon="el-icon-check" size="mini" circle />
                        <el-button type="warning" icon="el-icon-star-off" size="mini" circle />
                        <el-button type="danger" icon="el-icon-delete" size="mini" circle />
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <span class="demonstration" />
                <el-pagination
                    layout="prev, pager, next"
                    :total="50"
                />
            </div>
        </el-main>
        <!-- 标准组卷 -->
        <el-main v-if="showNormalGen">
            <el-container>
                <el-col span="9">
                    &nbsp;
                </el-col>
                <el-col span="12">
                    <label>组卷配置信息:</label>
                    <br>
                    <el-row style="width: 50%">

                        配置项名称:<el-input v-model="configName" class="el-input" size="normal" ></el-input>
                    </el-row>
                    <el-row style="width: 50%" >
                        <br>
                        是否启用
                        <el-radio v-model="radio" label="1">是</el-radio>
                        <el-radio v-model="radio" label="2">否</el-radio>
                    </el-row>
                    <el-row style="" >
                        <br>
                        添加组卷明细&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button type="success" size="mini" icon="el-icon-plus" @click="handleAddCombExamConfigDetail"></el-button>
                    </el-row>
                </el-col>
            </el-container>


            <label > 组卷明细：</label>
            <!-- 组卷明细表 -->
            <el-table :data="combExamConfigDetailInsertArray" border  height="60%" @selection-change="handlePaperSelectionChange">
                <el-table-column type="selection" width="30%" />
                <el-table-column prop="subjectCategoriesOptionVal" label="题目类型" />
                <el-table-column prop="subjectTypeOptionVal" label="题型" />
                <el-table-column prop="subjectCount" label="题目数量" />
                <el-table-column prop="subjectDifficulty" label="题目难度" />
                <el-table-column prop="subjectScore" label="题目分值" />
                <el-table-column label="操作" width="150%">
                    <template>
                        <el-button type="primary" icon="el-icon-edit" size="mini" circle />
                        <el-button type="success" icon="el-icon-plus" size="mini" circle />
                        <el-button type="danger" icon="el-icon-delete" size="mini" circle />
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="float:right;">
                <el-button type="primary" icon="el-icon-plus" @click="handleNormalGen">开始组卷</el-button>
                <el-button type="info" icon="el-icon-back" @click="returnParent">&nbsp;&nbsp;返回&nbsp;&nbsp;</el-button>
            </el-row>
            <div class="block">
                <span class="demonstration" />
                <el-pagination
                    layout="prev, pager, next"
                    :total="50"
                />
            </div>
        </el-main>
        <!-- 添加组卷明细 -->
        <el-main v-if="showCombExamConfigDetail" >
            <el-container>
                <el-col span="8">&nbsp;</el-col>
                <el-col span="12">
                    <label>添加组卷明细</label>
                    <el-form >
                        <el-form-item label="题目类型">
                            <el-select v-model="insertObject.subjectCategoriesOptionVal" placeholder="可选项" size="mini" style="width: 15%" value="">&nbsp;
                                <el-option
                                        v-for="item in subjectCategoriesOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="题型">
                            <el-select v-model="insertObject.subjectTypeOptionVal" placeholder="可选项" size="mini" style="width: 15%" value="">&nbsp;
                                <el-option
                                        v-for="item in subjectTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <div class="block">
                            <span class="demonstration">题目数量</span>
                            <el-slider style="width: 50%" v-model="insertObject.subjectCount"></el-slider>
                        </div>
                        <el-form-item label="题目难度">
                            <el-select v-model="insertObject.subjectDifficulty" placeholder="可选项" size="mini" style="width: 10%" value="">&nbsp;
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <div class="block">
                            <span class="demonstration">每题分值</span>
                            <el-slider style="width: 50%" v-model="insertObject.subjectScore"></el-slider>
                        </div>
                    </el-form>
                    <el-button icon="el-icon-plus" @click="handleInsert">添加</el-button>
                </el-col>
            </el-container>


        </el-main>
    </el-container>
    </div>
</template>

<script>
export default {
    name: 'Position',
    data() {
        return {
            //查询属性
            paperName:'',
            creator:'',
            options: [{
            value: '1',
            label: '简单'
            }, {
            value: '2',
            label: '中等'
            }, {
            value: '3',
            label: '困难'
            }],
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
            paperVos: [
                {
                    paperVoId:'51251759259125',
                    paperSubject: 'java基础题',
                    paperCreator: 'aaron',
                    paperType: 'Java',
                    paperDifficulty: '容易',
                    paperCombExamTime: '2019-8-20',
                    paperScore: '100',
                    paperDescription: '很简单的JAVA测试',
                    paperStatus: '1'
                },
                {
                    paperVoId:'6431759259125',
                    paperSubject: 'java基础题',
                    paperCreator: 'Aaron',
                    paperType: 'Java',
                    paperDifficulty: '容易',
                    paperCombExamTime: '2019-8-11',
                    paperScore: '100',
                    paperDescription: '很简单的JAVA测试',
                    paperStatus: '1'
                },
            ],
            combExamConfigVos:[
                {
                    combExamConfigVoId:'96713895135131',
                    combExamConfigName:"配置项1",
                    difficulty:"容易",
                    updatedBy:"Aaron",
                    updateTime:"2019-8-18",
                    company:"alibaba",
                    combExamConfigNameCommit:"极其简单的Java题"
                },
                {
                    combExamConfigVoId:'78313895135131',
                    combExamConfigName:"配置项2",
                    difficulty:"中等",
                    updatedBy:"Aaron",
                    updateTime:"2019-8-19",
                    company:"alibaba",
                    combExamConfigNameCommit:"中等难度的Java题"
                },
                {
                    combExamConfigVoId:'52414663613512',
                    combExamConfigName:"配置项3",
                    difficulty:"困难",
                    updatedBy:"Aaron",
                    updateTime:"2019-8-20",
                    company:"alibaba",
                    combExamConfigNameCommit:"极其困难的Java题"
                }
            ],
            combExamConfigDetailVos:[
                {
                    combExamConfigDetailId:'22151251258895',
                    combExamConfigVoId: '52414663613512',
                    combExamConfigDetailName: 'java',
                    combExamConfigDetailSubjectType: '选择题',
                    combExamConfigDetailSubjectAmount: '30',
                    combExamConfigDetailSubjectDifficulty: '中等',
                    combExamConfigDetailSubjectScore: '2'
                },{
                    combExamConfigDetailId:'623151251258895',
                    combExamConfigVoId: '52414663613512',
                    combExamConfigDetailName: 'C++',
                    combExamConfigDetailSubjectType: '选择题',
                    combExamConfigDetailSubjectAmount: '30',
                    combExamConfigDetailSubjectDifficulty: '容易',
                    combExamConfigDetailSubjectScore: '2'
                }
            ],
            //组卷参数
            subjectTypeOptions: [{
                value: '1',
                label: '单选题'
            }, {
                value: '2',
                label: '多选题'
            }, {
                value: '3',
                label: '填空题'
            },{
                value: '4',
                label: '编程题'
            },{
                value: '5',
                label: '智力题'
            }
            ],
            subjectCategoriesOptions: [{
                value: 'Java题',
                label: 'Java题'
            }, {
                value: 'C题',
                label: 'C题'
            }, {
                value: 'C++题',
                label: 'C++题'
            }],


            insertObject:{
                subjectCategoriesOptionVal:'',
                subjectTypeOptionVal:'',
                subjectCount:'',
                subjectDifficulty:'',
                subjectScore:'',
            },
            combExamConfigDetailInsertArray:[

            ],

            //显示试卷表
            show: true,
            //显示配置表
            showFastGen: false,
            //显示配置细节
            showConfigDetail: false,
            //显示标准组卷
            showNormalGen: false,
            //标准组卷选择
            radio: '',
            //创建的组卷配置名
            configName: '',
            //搜索栏
            showSelectBar: true,
            //选择框
            selected: '',
            //试卷详情按钮
            showPaperInf: true,
            //返回上级
            showReturn: false,
            //标准组卷添加组卷明细
            showCombExamConfigDetail:false,
        }
    },
    mounted() {
        this.getPaperVo();
    },
    methods: {

        handleFastGen(){
            this.show = false;
            this.showFastGen = true;
            this.showConfigDetail = false;
            this.showNormalGen = false;
            this.showSelectBar = false;
            this.showPaperInf = false;
            this.showReturn = true;
            this.showCombExamConfigDetail = false;
        },
        normalGen(){
            this.show = false;
            this.showFastGen = false;
            this.showConfigDetail = false;
            this.showNormalGen = true;
            this.showSelectBar = false;
            this.showPaperInf = false;
            this.showReturn = true;
            this.showCombExamConfigDetail = false;
        },
        handleDetail(){
            if (this.selected.length!=1){
                alert("有且仅有一份记录能被选择");
            }else {
                var id = this.selected[0].combExamConfigVoId;
                alert(id);
                this.queryCombExamConfigDetailByCombExamConfigId(id)
                this.show = false;
                this.showFastGen = true;
                this.showConfigDetail = true;
                this.showNormalGen = false;
                this.showSelectBar = false;
                this.showPaperInf = false;
                this.showReturn = true;
                this.showCombExamConfigDetail = false;
            }
        },
        queryCombExamConfigDetailByCombExamConfigId(id){
            //从后端拿符合此id的combExamConfigDetailsVo
            console.info(id);
        },
        returnParent(){
            this.show = true;
            this.showFastGen = false;
            this.showConfigDetail = false;
            this.showNormalGen = false;
            this.showSelectBar = true;
            this.showPaperInf = true;
            this.showReturn = false;
            this.showCombExamConfigDetail = false;
        },
        handleTemplateGen(){
            this.show = true;
            this.showFastGen = false;
            this.showConfigDetail = false;
            this.showNormalGen = false;
            this.showSelectBar = true;
            this.showPaperInf = false;
            this.showReturn = true;
            this.showCombExamConfigDetail = false;
        },
        showPaperInfo(){
            if (this.selected == ''||this.selected == null||this.selected.length!=1){
                alert("必须且仅选择一份试卷");
            }else {
                console.log(this.selected[0]);
                alert(this.selected[0].paperVoId);
            }
        },
        handlePaperSelectionChange(selection) {
          this.selected = selection;
        },
        handleQuery(){
            if (this.paperName==''&&this.creator==''&&this.optionVal==''&&this.combExamTimeSelect==''){
                alert("必须至少填一项进行查询");
            }else {
                alert(this.paperName+this.creator+this.combExamTimeSelect+this.optionVal);
            }

        },
        handleNormalGen(){
            if (this.configName==''||this.radio==''||this.selected==''){
                alert("请完成配置项名称填写、是否启用、并选择至少一项组卷配置明细");
            }else {
                alert(this.configName+this.radio+this.selected)
            }
        },
        handleAddCombExamConfigDetail(){
            this.show = false;
            this.showFastGen = false;
            this.showConfigDetail = false;
            this.showNormalGen = false;
            this.showSelectBar = true;
            this.showPaperInf = false;
            this.showReturn = true;
            this.showCombExamConfigDetail = true;
        },
        initInsertObject(){
            this.insertObject={
                subjectCategoriesOptionVal:'',
                subjectTypeOptionVal:'',
                subjectCount:'',
                subjectDifficulty:'',
                subjectScore:'',
            };
        },
        handleInsert(){
            alert(JSON.stringify(this.insertObject));
            this.combExamConfigDetailInsertArray.push(this.insertObject);
            this.initInsertObject();
            this.normalGen();
        },
        getPaperVo(){

        }
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
