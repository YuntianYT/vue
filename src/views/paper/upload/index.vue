<template>
  <div class="dashboard-container">
      <el-container style="height: 800px">
          <el-header style="height:10%; width: 100%">
              <el-row style="height:50%" >
                  试卷名：<el-input size="mini" style="width: 10%" />&nbsp;
                  组卷人：<el-input size="mini" style="width: 10%" />&nbsp;
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
                  <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
              </el-row>
              <el-row style="display: inline">
                  <br>
                  <el-button type="success" size="mini" icon="el-icon-upload" @click="handleDownload">将公司库试卷上传到机构库</el-button>
              </el-row>
          </el-header>
          <!-- 默认显示试卷列表 -->
          <el-main v-if="show">
              <el-table :data="paperVos" border style="width: 100%" height="90%" @selection-change="handlePaperSelectionChange">
                  <el-table-column type="selection" width="30%" />
                  <el-table-column prop="subject" label="题目" />
                  <el-table-column prop="createdBy" label="组卷人" />
                  <el-table-column prop="paperType" label="试卷类型" />
                  <el-table-column prop="paperDifficulty" label="试卷难度" />
                  <el-table-column prop="combExamTime" label="组卷时间" />
                  <el-table-column prop="paperScore" label="试卷总分" />
                  <el-table-column prop="description" label="试卷描述" />
                  <el-table-column prop="status" label="状态" />
                  <el-table-column label="操作" width="100%">
                      <template>
                          <el-button type="primary" icon="el-icon-upload" size="mini" circle />
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
              options: [{
                  value: '选项1',
                  label: '简单'
              }, {
                  value: '选项2',
                  label: '中等'
              }, {
                  value: '选项3',
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
              //公司的试卷
              paperVos: [
                  {
                      paperVoId:'51251759259125',
                      subject: 'java基础题',
                      createdBy: 'aaron',
                      paperType: 'Java',
                      paperDifficulty: '容易',
                      combExamTime: '2019-8-20',
                      paperScore: '100',
                      description: '很简单的JAVA测试',
                      status: '1'
                  },
                  {
                      paperVoId:'6431759259125',
                      subject: 'java基础题',
                      createdBy: 'Aaron',
                      paperType: 'Java',
                      paperDifficulty: '容易',
                      combExamTime: '2019-8-11',
                      paperScore: '100',
                      description: '很简单的JAVA测试',
                      status: '1'
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

          handleDownload(){
              alert("上传成功，已放入机构库");
          },
          handlePaperSelectionChange(selection) {
              this.selected = selection;
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
