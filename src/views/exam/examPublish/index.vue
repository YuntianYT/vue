<template>
  <div class="dashboard-container">
    <el-container style="height: 650px">
      <el-header style="height:25%; width: 100%">
        <el-form :model="queryForm" :inline="true">
          <el-form-item label="试卷发布人">
            <el-input
              v-model="queryForm.publisher"
              placeholder="试卷发布人"
              size="mini"
              @keyup.enter.native="queryExamPublishRecord"
            />
          </el-form-item>
          <el-form-item label="发布时间段">
            <el-date-picker
              v-model="queryForm.publishTimeRange"
              size="mini"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @keyup.enter.native="queryExamPublishRecord"
            />
          </el-form-item>
          <el-row>
            <el-form-item label="考试标题">
              <el-input
                v-model="queryForm.title"
                placeholder="考试标题"
                size="mini"
                @keyup.enter.native="queryExamPublishRecord"
              />
            </el-form-item>
            <el-form-item label="考试时间段">
              <el-date-picker
                v-model="queryForm.examTimeRange"
                size="mini"
                type="datetimerange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @keyup.enter.native="queryExamPublishRecord"
              />
            </el-form-item>
            <el-button
              style="margin-top: 5px"
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="queryExamPublishRecord"
            >查询</el-button>
          </el-row>
        </el-form>
        <div>
          <el-row style="display: inline">
            <el-button
              :disabled="flag"
              type="success"
              size="mini"
              @click="showSelectedEditPublishFormDialog"
            >
              <i class="el-icon-edit" />修改
            </el-button>
            <el-button type="danger" size="mini" @click="deleteSelected">
              <i class="el-icon-delete" />删除
            </el-button>
            <el-button type="primary" size="mini" @click="showPublishFormDialog">
              <i class="el-icon-circle-plus" />发布
            </el-button>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          height="90%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="35" />
          <el-table-column prop="publisher" label="试卷发布人" />
          <el-table-column prop="createdTime" label="发布时间" />
          <el-table-column prop="endTime" label="考试结束时间" />
          <el-table-column prop="planPepoleNum" label="计划人数" />
          <el-table-column prop="limitTime" label="考试时长" />
          <el-table-column prop="examiner" label="评卷官">
            <el-tag v-for="tag in publishForm.examiners" :key="tag">{{ tag }}</el-tag>
          </el-table-column>
          <el-table-column prop="title" label="考试标题" />
          <el-table-column prop="descript" label="考试说明" />
          <el-table-column prop="status" label="状态列" />
          <el-table-column prop="publishTimes" label="发布次数" />
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                @click="showEditPublishFormDialog(scope.$index,tableData)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="deleteSingle(scope.$index,tableData)"
              />
              <el-button type="warning" icon="el-icon-share" size="mini" circle @click="toQRCode" />
            </template>
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

    <!-- add publishForm -->
    <el-dialog title="发布信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="publishForm" label-width="270px">
        <el-form-item label="试卷">
          <el-tag
            v-for="(tag,key) in publishForm.paper"
            :key="key"
            closable
            @close="closePaperTag(tag)"
          >{{ tag }}</el-tag>
          <el-button
            type="primary"
            :disabled="publishForm.paper.length >= 1"
            @click="queryPaper();paperInnerVisible = true"
          >选择试卷</el-button>
        </el-form-item>
        <el-form-item label="考试场次">
          <el-input v-model="publishForm.examSession" style="width: 50%" />
        </el-form-item>
        <el-form-item label="考试标题">
          <el-input v-model="publishForm.title" style="width: 50%" />
        </el-form-item>
        <el-form-item label="考试开始时间">
          <el-date-picker v-model="publishForm.startTime" type="datetime" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="考试截止时间">
          <el-date-picker v-model="publishForm.endTime" type="datetime" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="计划参与人数">
          <el-input v-model.number="publishForm.planPepoleNum" style="width: 50%" />
        </el-form-item>
        <el-form-item label="考试时长">
          <el-input v-model="publishForm.limitTime" style="width: 50%" />
        </el-form-item>
        <el-form-item label="阅卷官">
          <el-tag
            v-for="tag in publishForm.examiners"
            :key="tag"
            closable
            @close="closeExaminersTag(tag)"
          >{{ tag }}</el-tag>
          <el-button type="primary" @click="examinerInnerVisible = true">添加阅卷官</el-button>
        </el-form-item>
        <el-form-item label="阅卷方式">
          <el-select v-model="publishForm.markingModes.value" placeholder="请选择阅卷方式">
            <el-option
              v-for="item in publishForm.markingModes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择阅卷截止时间">
          <div class="block">
            <el-date-picker
              v-model="publishForm.markingStopTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="publishForm.descript" style="width: 300px" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPublishForm();dialogFormVisible = false">确 定</el-button>
      </div>

      <!-- 试卷dialog -->
      <el-dialog width="30%" title="选择试卷" :visible.sync="paperInnerVisible" append-to-body>
        <el-form :model="paperDialogQueryForm" :inline="true">
          <el-form-item label="试卷名称">
            <el-input v-model="paperDialogQueryForm.paper" placeholder="试卷名称" />
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="queryPaper">查询</el-button>
        </el-form>
        <el-table
          :data="paperTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          style="width: 100%"
          height="500px"
          v-loading="loading"
        >
          <el-table-column prop="name" label="试卷名称" width="280px" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="choosePaper(scope.$index,paperTableData);paperInnerVisible = false"
              >选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="paperTotal"
          :current-page="paperDialogQueryForm.currentPage"
          :page-size="pageSize"
          @current-change="handlePaperCurrentChange"
        />
      </el-dialog>

      <!-- 阅卷官dialog -->
      <el-dialog width="30%" title="选择阅卷官" :visible.sync="examinerInnerVisible" append-to-body>
        <el-form :model="examinersDialogQueryForm" :inline="true">
          <el-form-item label="阅卷官">
            <el-input v-model="examinersDialogQueryForm.examiner" placeholder="阅卷官" />
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="queryExaminers">查询</el-button>
        </el-form>
        <el-table :data="examinersTableData" border style="width: 100%" height="90%">
          <el-table-column prop="paper" label="阅卷官" width="280px" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="chooseExaminer(scope.$index,tableData);examinerInnerVisible = false"
              >选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="examinerTotal"
          :current-page="examinersDialogQueryForm.currentPage"
          :page-size="pageSize"
          @current-change="handleExaminerCurrentChange"
        />
      </el-dialog>
    </el-dialog>

    <!-- edit publishForm -->
    <el-dialog title="修改发布信息" :visible.sync="editDialogFormVisible" center>
      <el-form :model="publishForm" label-width="270px">
        <el-form-item label="试卷">
          <el-tag
            v-for="(tag,key) in publishForm.paper"
            :key="key"
            closable
            @close="closePaperTag(tag)"
          >{{ tag }}</el-tag>
          <el-button
            type="primary"
            :disabled="publishForm.paper.length >= 1"
            @click="paperInnerVisible = true"
          >选择试卷</el-button>
        </el-form-item>
        <el-form-item label="考试场次">
          <el-input v-model="publishForm.examSession" style="width: 50%" />
        </el-form-item>
        <el-form-item label="考试标题">
          <el-input v-model="publishForm.title" style="width: 50%" />
        </el-form-item>
        <el-form-item label="考试开始时间">
          <el-date-picker v-model="publishForm.startTime" type="datetime" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="考试截止时间">
          <el-date-picker v-model="publishForm.endTime" type="datetime" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="计划参与人数">
          <el-input v-model.number="publishForm.planPepoleNum" style="width: 50%" />
        </el-form-item>
        <el-form-item label="考试时长">
          <el-input v-model="publishForm.limitTime" style="width: 50%" />
        </el-form-item>
        <el-form-item label="阅卷官">
          <el-tag
            v-for="tag in publishForm.examiners"
            :key="tag"
            closable
            @close="closeExaminersTag(tag)"
          >{{ tag }}</el-tag>
          <el-button type="primary" @click="examinerInnerVisible = true">添加阅卷官</el-button>
        </el-form-item>
        <el-form-item label="阅卷方式">
          <el-select v-model="publishForm.markingModes.value" placeholder="请选择阅卷方式">
            <el-option
              v-for="item in publishForm.markingModes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择阅卷截止时间">
          <div class="block">
            <el-date-picker
              v-model="publishForm.markingStopTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="publishForm.descript" style="width: 300px" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditPublishForm();editDialogFormVisible = false">确 定</el-button>
      </div>

      <!-- 试卷dialog -->
      <el-dialog width="30%" title="选择试卷" :visible.sync="paperInnerVisible" append-to-body>
        <el-form :model="paperDialogQueryForm" :inline="true">
          <el-form-item label="试卷名称">
            <el-input v-model="paperDialogQueryForm.paper" placeholder="试卷名称" />
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="queryPaper">查询</el-button>
        </el-form>
        <el-table :data="paperTableData" border style="width: 100%" height="90%">
          <el-table-column prop="paper" label="试卷名称" width="280px" />
          <el-table-column label="操作">
            <el-button type="primary" @click="choosePaper();paperInnerVisible = false">选择</el-button>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="paperTotal"
          :current-page="paperDialogQueryForm.currentPage"
          :page-size="pageSize"
          @current-change="handlePaperCurrentChange"
        />
      </el-dialog>

      <!-- 阅卷官dialog -->
      <el-dialog width="30%" title="选择阅卷官" :visible.sync="examinerInnerVisible" append-to-body>
        <el-form :model="examinersDialogQueryForm" :inline="true">
          <el-form-item label="阅卷官">
            <el-input v-model="examinersDialogQueryForm.examiner" placeholder="阅卷官" />
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="queryExaminers">查询</el-button>
        </el-form>
        <el-table :data="examinersTableData" border style="width: 100%" height="90%">
          <el-table-column prop="paper" label="阅卷官" width="280px" />
          <el-table-column label="操作">
            <el-button type="primary" @click="chooseExaminer();examinerInnerVisible = false">选择</el-button>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="examinerTotal"
          :current-page="examinersDialogQueryForm.currentPage"
          :page-size="pageSize"
          @current-change="handleExaminerCurrentChange"
        />
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { query, save, del, update, getPaperInfo } from '@/api/exam/examPublishRecord.js'
export default {
  data() {
    return {
      flag: true,
      tableData: [],
      paperTableData: [],
      currentPage: 1,
      examinersTableData: [],
      dialogFormVisible: false,
      editDialogFormVisible: false,
      visible: false,
      paperInnerVisible: false,
      examinerInnerVisible: false,
      // page
      pageSize: 8,
      total: 0,
      paperTotal: 0,
      examinerTotal: 0,
      // page
      loading: true,
      queryForm: {
        publisher: '',
        publishTimeRange: [],
        title: '',
        examTimeRange: [],
        currentPage: 1
      },
      paperDialogQueryForm: {
        paper: ''
      },
      examinersDialogQueryForm: {
        examiner: ''
      },
      publishForm: {
        paper: [],
        examSession: '',
        title: '',
        startTime: '',
        endTime: '',
        planPepoleNum: '',
        limitTime: '',
        markingStopTime: '',
        markingModes: [{
          value: '1',
          label: '阅卷方式1'
        },
        {
          value: '2',
          label: '阅卷方式2'
        }],
        examiners: ['阅卷官1', '阅卷官2'],
        descript: '',
        paperId: null
      }
    }
  },
  mounted() {
    this.getExamPublishRecord()
  },
  methods: {
    getExamPublishRecord() {
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
    // 发送查询请求
    queryExamPublishRecord() {
      this.queryForm.currentPage = 1
      query(this.queryForm).then(res => {
        this.tableData = res.pageInfo.list
        this.total = res.total
        this.loading = false
      })
    },
    // 展示发布记录窗口
    showPublishFormDialog() {
      this.clearForm()
      this.dialogFormVisible = true
    },
    // 新增发布记录
    submitPublishForm() {
      save(this.publishForm).then(res => {
        this.getExamPublishRecord()
      })
    },
    // 展示修改发布记录窗口
    showEditPublishFormDialog(index, tableData) {
      this.clearForm
      this.editDialogFormVisible = true
      const item = tableData[index]
      this.publishForm.id = item.id
      this.publishForm.title = item.title
      this.publishForm.examSession = item.examSession
      this.publishForm.planPepoleNum = item.planPepoleNum
      this.publishForm.limitTime = item.limitTime
      this.publishForm.descript = item.descript
    },
    showSelectedEditPublishFormDialog() {
      this.clearForm()
      const selection = this.$refs.multipleTable.selection
      this.editDialogFormVisible = true
      const item = selection[0]
      this.publishForm.id = item.id
      this.publishForm.title = item.title
      this.publishForm.examSession = item.examSession
      this.publishForm.planPepoleNum = item.planPepoleNum
      this.publishForm.limitTime = item.limitTime
      this.publishForm.descript = item.descript
    },
    // 提交修改发布记录
    submitEditPublishForm() {
      update(this.publishForm).then(res => {
        this.getExamPublishRecord()
      })
    },
    // 选择试卷
    choosePaper(index, tableData) {
      console.log(tableData[index].name)
      console.log(this.publishForm)
      this.publishForm.paper.push(tableData[index].name)
      this.publishForm.paperId=tableData[index].id
    },
    // 选择阅卷官
    chooseExaminer(index, tableData) {

    },
    // 获取试卷列表
    queryPaper() {
      this.loading = true
      getPaperInfo(1).then(res => {
        this.paperTableData = res
        this.paperTotal=res.length
        this.loading = false
      })
    },
    queryExaminers() {

    },
    toQRCode() {
      this.$router.push({ name: 'DoPaper' })
    },
    closePaperTag(tag) {
      this.publishForm.paper.splice(this.publishForm.paper.indexOf(tag), 1)
    },
    closeExaminersTag(tag) {
      this.publishForm.examiners.splice(this.publishForm.examiners.indexOf(tag), 1)
    },
    // 删除多条选中
    deleteSelected() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const deleteForm = []
        const selection = this.$refs.multipleTable.selection
        selection.forEach(element => {
          deleteForm.push({ id: element.id, version: element.version })
        })
        del(deleteForm).then(res => {
          if (res === 'success') {
            this.queryForm.currentPage = 1
            this.getExamPublishRecord()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除一条
    deleteSingle(index, tableData) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const deleteForm = []
        deleteForm.push({ id: tableData[index].id, version: tableData[index].version })
        del(deleteForm).then(res => {
          if (res === 'success') {
            this.queryForm.currentPage = 1
            this.getExamPublishRecord()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange(rows) {
      if (rows.length != 1) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    clearForm() {
      // clear
      this.publishForm = {
        id: '',
        paper: [],
        examSession: '',
        title: '',
        startTime: '',
        endTime: '',
        planPepoleNum: '',
        limitTime: '',
        markingStopTime: '',
        markingModes: [{
          value: '1',
          label: '阅卷方式1'
        },
        {
          value: '2',
          label: '阅卷方式2'
        }],
        examiners: ['阅卷官1', '阅卷官2'],
        descript: ''
      }
    },
    handleExaminerCurrentChange() {

    },
    handlePaperCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px;
}
</style>
