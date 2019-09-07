<template>
  <div class="dashboard-container">
    <el-container>
      <el-main>
        <el-header style="height:30% width: 100%">
          <el-row>
            <el-form :inline="true" style="float: left">
              <el-form-item label="组织机构：" style="margin-right: 50px">
                <el-input v-model="queryForm.name" size="mini" style="width: 160px" placeholder="请输入" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="queryOrganization">查询</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row style="display: inline">
            <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="saveOrganization()">增加</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="delSelectOrganization()">删除</el-button>
            <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateSelectOrganization()">修改</el-button>
          </el-row>
        </el-header>
        <el-main v-if="show">
          <el-table :data="organizationData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35" />
            <el-table-column prop="name" label="组织机构" />
            <el-table-column prop="code" label="机构代码" />
            <el-table-column prop="master" label="负责人" />
            <el-table-column prop="tel" label="电话" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="status" label="是否启用" />
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-plus" size="mini" circle @click="saveOrganization()" />
                <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="delOrganization(scope.row)" />
                <el-button type="warning" icon="el-icon-edit" size="mini" circle @click="updateOrganization(scope.row)" />
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
      </el-main>
    </el-container>
    <el-dialog :visible.sync="saveDialogVisible" title="新增组织机构" center width="500px">
      <el-header style="height: 5px">
        <i class="el-icon-user" style="float: left">组织机构基本信息</i>
      </el-header>
      <el-divider style="margin: 10px 0px" />
      <el-form ref="saveForm" :model="saveForm" label-width="120px" size="mini" inline="true" :rules="FormRules">
        <el-form-item label="组织机构名：" prop="name">
          <el-input v-model="saveForm.name" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机构代码：" prop="code">
          <el-input v-model="saveForm.code" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="负责人：" prop="master">
          <el-input v-model="saveForm.master" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="电话：" prop="tel">
          <el-input v-model="saveForm.tel" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="saveForm.address" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否启用：" prop="status">
          <el-radio-group v-model="saveForm.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="saveOrganizationData(saveForm)">确 定</el-button>
        <el-button size="mini" @click="saveDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog style="margin-top: 30px" title="消 息" :visible.sync="deleteDialogVisible" width="40%" center>
      <span>确定要删除该组织机构吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="delOrganizationData()">确 定</el-button>
        <el-button size="mini" @click="deleteDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" title="修改组织机构" center width="500px">
      <el-header style="height: 5px">
        <i class="el-icon-user" style="float: left">组织机构基本信息</i>
      </el-header>
      <el-divider style="margin: 10px 0px" />
      <el-form ref="updateForm" :model="updateForm" label-width="120px" size="mini" inline="true" :rules="FormRules">
        <el-form-item label="组织机构名：" prop="name">
          <el-input v-model="updateForm.name" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机构代码：" prop="code">
          <el-input v-model="updateForm.code" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="负责人：" prop="master">
          <el-input v-model="updateForm.master" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="电话：" prop="tel">
          <el-input v-model="updateForm.tel" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="updateForm.address" style="width: 200px" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否启用：" prop="status">
          <el-radio-group v-model="updateForm.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="updateOrganizationData(updateForm)">确 定</el-button>
        <el-button size="mini" @click="updateDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { save, del, update, query } from '@/api/user/organization.js'
export default {
  name: 'Position',
  data() {
    return {
      organizationData: [],
      queryForm: {
        name: '',
        currentPage: 1,
        pageSize: 10
      },
      show: true,
      FormRules: {
        name: [{ required: true, message: '请输入组织机构名', trigger: 'blur' }],
        code: [{ required: true, message: '请输入机构代码', trigger: 'blur' }],
        master: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        status: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
      },
      saveForm: {
        id: '',
        name: '',
        code: '',
        master: '',
        tel: '',
        address: '',
        status: ''
      },
      updateForm: {
        id: '',
        name: '',
        code: '',
        master: '',
        tel: '',
        address: '',
        status: ''
      },
      total: 0,
      pageSize: 10,
      deleteFrom: [],
      multipleSelection: [],
      saveDialogVisible: false,
      deleteDialogVisible: false,
      updateDialogVisible: false
    }
  },
  mounted() {
    this.getOrganization()
  },
  methods: {
    getOrganization() {
      query(this.queryForm).then(res => {
        console.log(res)
        this.organizationData = res.pageInfo.list
        this.total = res.total
      })
    },
    queryOrganization() {
      query(this.queryForm).then(res => {
        this.organizationData = res.list
      })
    },
    saveOrganization() {
      this.saveDialogVisible = true
    },
    saveOrganizationData(saveForm) {
      save(saveForm).then(res => {
        this.saveDialogVisible = false
        this.getOrganization()
      })
    },
    delOrganization(row) {
      this.deleteDialogVisible = true
      this.deleteFrom[0] = row
    },
    delSelectOrganization(row) {
      this.deleteDialogVisible = true
      this.deleteFrom = this.multipleSelection
    },
    delOrganizationData() {
      del(this.deleteFrom).then(res => {
        this.deleteDialogVisible = false
        this.getOrganization()
      })
    },
    updateOrganization(row) {
      this.updateDialogVisible = true
      this.updateForm = row
    },
    updateSelectOrganization(row) {
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: '不可多条修改',
          type: 'faile'
        })
      } else if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选中一条进行修改',
          type: 'faile'
        })
      } else {
        this.updateForm = this.multipleSelection[0]
        this.updateDialogVisible = true
      }
    },
    updateOrganizationData(updateForm) {
      update(updateForm).then(res => {
        this.updateDialogVisible = false
        this.getOrganization()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(currentPage) {
      this.queryForm.currentPage = currentPage
      this.loading = true
      query(this.queryForm).then(res => {
        this.organizationData = res.pageInfo.list
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 20px;
    line-height: 10px;
  }
}
.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
