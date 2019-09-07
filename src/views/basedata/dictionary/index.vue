<template>
  <div class="dashboard-container">
    <el-container style="height: 800px">
      <el-header style="height:10%; width: 100%">
        <!-- 表头 -->
        <el-row>
          <el-form :inline="true" style="float: left">
            <el-form-item label="字典名称：">
              <el-input v-model="dictionaryDataSearch.name" placeholder="请输入" style="width: 200px" />
            </el-form-item>
            <el-form-item label="字典类型：">
              <el-input v-model="dictionaryDataSearch.category" placeholder="请输入" style="width: 200px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDictionaryList">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <!-- 按钮 -->
        <el-row style="display: inline">
          <el-button type="success" size="mini" icon="el-icon-plus" @click="addDictionary">增加</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteDictionary">删除</el-button>
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="editDictionaryById({},selectList[0])">修改</el-button>
          <el-button type="primary" size="mini" icon="el-icon-upload" @click="handleImport">导入</el-button>
          <el-button type="primary" size="mini" icon="el-icon-download">导出</el-button>
        </el-row>
      </el-header>
      <!-- 表格 -->
      <el-main v-if="show">
        <el-table v-loading="listLoading" :data="dictionaryDataList" border style="width: 100%" height="426px" @selection-change="selectChange">
          <el-table-column v-model="editRow" type="selection" width="40%" />
          <el-table-column prop="name" label="字典名" />
          <el-table-column prop="category" label="字典类型" />
          <el-table-column prop="value" label="字典值" />
          <el-table-column prop="updatedTime" label="更新时间" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="status" label="状态" />
          <!-- 操作按钮 -->
          <el-table-column fixed="right" label="操作" width="150%">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-plus" size="mini" circle @click="addDictionary" />
              <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteDic(scope.row.id,scope.row.version)" />
              <el-button type="warning" icon="el-icon-edit" size="mini" circle @click="editDictionaryById(scope.$index,scope.row)" />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-button icon="el-icon-arrow-left" @click="prevPage" />
        <span>第{{ dictionaryDataSearch.currentPage }}页/共{{ totalPage }}页</span>
        <el-button icon="el-icon-arrow-right" @click="nextPage" />
      </el-main>
    </el-container>
    <!-- 增加窗口 -->
    <el-dialog title="基本信息" width="500px" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addForm" label-width="100px" :rules="FormRules">
        <el-form-item label="字典名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" style="width: 300px" />
        </el-form-item>
        <el-form-item label="字典类型" prop="category">
          <el-input v-model="addForm.category" auto-complete="off" style="width: 300px" />
        </el-form-item>
        <el-form-item label="字典值" prop="value">
          <el-input v-model="addForm.value" auto-complete="off" style="width: 300px" />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-radio v-model="addForm.status" label="1">是</el-radio>
          <el-radio v-model="addForm.status" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="addForm.remark" type="textarea" :rows="4" auto-complete="off" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="addLoading" @click="addSubmit">提交</el-button>
        <el-button @click="addFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 修改窗口 -->
    <el-dialog title="基本信息" width="500px" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form ref="editForm" :model="editForm" label-width="100px" :rules="FormRules">
        <el-form-item label="字典名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" style="width: 300px" />
        </el-form-item>
        <el-form-item label="字典类型" prop="category">
          <el-input v-model="editForm.category" auto-complete="off" style="width: 300px" />
        </el-form-item>
        <el-form-item label="字典值" prop="value">
          <el-input v-model="editForm.value" auto-complete="off" style="width: 300px" />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-radio v-model="editForm.status" label="1">是</el-radio>
          <el-radio v-model="editForm.status" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="editForm.remark" type="textarea" :rows="4" auto-complete="off" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="editLoading" @click="editSubmit">提交</el-button>
        <el-button @click="editFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!--导入窗口-->
    <el-dialog title="导入窗口" width="400px" :visible.sync="importFormVisible" :close-on-click-modal="false">
      <el-form ref="importForm" :inline="true" :model="importForm" label-width="80px">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <div style="align:center"><el-button size="small" type="primary" center>点击上传</el-button></div>
          <div slot="tip" class="el-upload__tip">只能上传 xlsx / xls 文件，且不超过1M</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="importLoading" @click="importSubmit">提交</el-button>
        <el-button @click="importFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { del, update, save, getData } from '@/api/basedata/dictionary'
export default {
  name: 'Dictionary',
  data() {
    return {
      // 导入窗口显示
      importFormVisible: false,
      // 文件上传List
      fileList: [],
      //  返回数据
      tableData: [],
      //  搜索区域参数
      dictionaryDataSearch: {
        name: '',
        category: '',
        pageSize: 7,
        currentPage: 1
      },
      //  列表数据来源
      dictionaryDataList: [],
      //  列表Loading加载
      listLoading: false,
      //  添加按钮Loading加载
      addLoading: false,
      show: true,
      //  新增界面是否显示
      addFormVisible: false,
      //  新增界面数据
      addForm: {
        name: '',
        category: '',
        value: '',
        status: '',
        remark: ''
      },
      //  批量选中data
      selectList: [],
      FormRules: {
        name: [{ required: true, message: '请输入字典名', trigger: 'blur' }],
        category: [{ required: true, message: '请输入字典类型', trigger: 'blur' }],
        value: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
        status: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
      },
      //  编辑界面是否显示
      editFormVisible: false,
      //  编辑按钮Loading加载
      editLoading: false,
      //  编辑界面row
      editRow: '',
      //  编辑界面数据
      editForm: {
        id: '',
        name: '',
        category: '',
        value: '',
        status: '',
        remark: ''
      },
      //  删除数据
      deleteForm: {
        id: '',
        version: ''
      },
      //  分页
      totalPage: 10 //  统共页数，默认为1
      // currentPage: 1, //  当前页数 ，默认为1
      // pageSize: 7 //  每页显示数量
    }
  },
  mounted() {
    //  初始加载
    this.getDictionaryList()
  },
  methods: {
    // 分页的前一页和后一页
    prevPage() {
      this.dictionaryDataSearch.currentPage--
      this.getDictionaryList()
    },
    nextPage() {
      this.dictionaryDataSearch.currentPage++
      this.getDictionaryList()
    },
    // 获取数据字典列表
    getDictionaryList() {
      getData(this.dictionaryDataSearch).then(res => {
        // console.log(res.data)
        this.dictionaryDataList = res.data.pageInfo.list
      })
    },
    //  显示新增界面
    addDictionary: function() {
      this.addFormVisible = true
    },
    //  新增
    addSubmit: function() {
      console.log(this.addForm)
      save(this.addForm).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addFormVisible = false
        this.getDictionaryList()
      })
      // this.$refs.addForm.validate(valid => {
      //   if (valid) {
      //     if (this.addForm.dictionaryName === '') {
      //       this.$message({
      //         message: '请填写字典名字',
      //         type: 'error'
      //       })
      //       return
      //     }
      //     if (this.addForm.dictionaryType === '') {
      //       this.$message({
      //         message: '请填写字典类型',
      //         type: 'error'
      //       })
      //       return
      //     }
      //     if (this.addForm.status === '') {
      //       this.addForm.status = '1'
      //     }
      //     if (this.addForm.dictionaryValue === '') {
      //       this.$message({
      //         message: '请填写字典值',
      //         type: 'error'
      //       })
      //     }
      //     if (this.addForm.comment === '') {
      //       this.$message({
      //         message: '请填写描述',
      //         type: 'error'
      //       })
      //     }
      //   }
      // })
    },
    //  显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    editDictionaryById: function(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    editSubmit: function() {
      if (this.editForm.name === '') {
        this.$message({
          message: '请填写字典名字',
          type: 'error'
        })
        return
      }
      if (this.editForm.category === '') {
        this.$message({
          message: '请填写字典类型',
          type: 'error'
        })
        return
      }
      if (this.editForm.value === '') {
        this.$message({
          message: '请填写字典值',
          type: 'error'
        })
        return
      }
      if (this.editForm.status === '') {
        this.$message({
          message: '请填写字典值',
          type: 'error'
        })
        return
      }
      update(this.editForm).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.editFormVisible = false
        this.getDictionaryList()
      })
    },
    //  table序号
    indexMethod(index) {
      return index + 1
    },
    //  批量选中
    selectChange: function(val) {
      this.selectList = val
    },
    //  批量删除
    deleteDictionary: function() {
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        const length = this.selectList.length
        // for (let i = 0; i < length; i++) {
        //   this.deleteDic(this.selectList[i].id)
        // }
        alert(length)
        this.deleteDic(this.selectList[0].id)
        this.getDictionaryList()
      })
    },
    //  单次删除
    deleteDic: function(id, version) {
      this.$confirm('确认删除吗？', '提示', {}).then(res => {
        this.deleteForm.id = id
        this.deleteForm.version = version
        del(this.deleteForm)
        alert(res.body.data)
        setTimeout(() => {
          this.getDictionaryList()
        }, 100)
      })
    },
    getResult: function(val) {
    },
    // 显示导入页面
    handleImport: function() {
      this.importFormVisible = true
    },
    // 文件相关方法
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
