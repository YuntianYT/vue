<template>
  <div class="dashboard-container">
    <el-container style="height: 650px">
      <el-header style="height:100px; width: 100%">
        <el-form :model="queryForm" :inline="true">
          <el-form-item label="批阅状态">
            <el-select
              v-model="queryForm.status"
              size="mini"
              style="width: 100px"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                size="mini"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="交卷时间段">
            <el-date-picker
              v-model="queryForm.endTimeRange"
              size="mini"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @keyup.enter.native="queryRecord"
            />
          </el-form-item>
          <el-form-item label="场次">
            <el-input
              v-model="queryForm.examSession"
              size="mini"
              placeholder="场次"
              @keyup.enter.native="queryRecord"
            />
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            style="margin-top: 5px"
            @click="queryRecord"
          >查询</el-button>
        </el-form>
        <div>
          <el-button type="primary" size="mini">
            <i class="el-icon-notebook-1" />阅卷
          </el-button>
        </div>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%" height="90%">
          <el-table-column type="selection" width="35" />
          <el-table-column prop="paperId" label="试卷" />
          <el-table-column prop="examSession" label="场次" />
          <el-table-column prop="createdTime" label="发布日期" />
          <el-table-column prop="tel" label="答卷人手机号" />
          <el-table-column prop="examiner" label="答卷人" />
          <el-table-column prop="actualEndTime" label="交卷时间" />
          <el-table-column prop="markingStopTime" label="阅卷终止时间" />
          <el-table-column prop="objectiveSubjectScore" label="客观题" />
          <el-table-column prop="subjectvieSubjectScore" label="主观题" />
          <el-table-column prop="systemEvaluate" label="系统评价" />
          <el-table-column prop="status" label="状态" />
          <el-table-column label="操作">
            <i style="color:green;font-size:20px" class="el-icon-notebook-1" />
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration" />
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="queryForm.currentPage"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { query } from '@/api/exam/grade.js'
export default {
  data() {
    return {
      pageSize: 8,
      total: 0,
      loading: true,
      tableData: [],
      options: [{
        value: 1,
        label: '已批阅'
      },
      {
        value: 0,
        label: '未批阅'
      }],
      queryForm: {
        status: null,
        endTimeRange: [],
        title: '',
        currentPage: 1
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 加载时获取数据
    getTableData() {
      query(this.queryForm).then(res => {
        this.tableData = res.pageInfo.list
        this.total = res.total
        this.loading = false
      })
    },
    handleCurrentChange: function(currentPage) {
      this.queryForm.currentPage = currentPage
      this.loading = true
      query(this.queryForm).then(res => {
        this.tableData = res.pageInfo.list
        this.loading = false
      })
    },
    // 点击查询获取数据
    queryRecord() {
      console.log(this.queryForm)
      this.queryForm.currentPage = 1
      query(this.queryForm).then(res => {
        this.tableData = res.pageInfo.list
        this.total = res.total
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px;
}
</style>
