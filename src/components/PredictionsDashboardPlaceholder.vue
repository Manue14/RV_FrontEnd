<template>
  <div class="main-content">
      <div class="dashboard-panel-row">
        <div class="dashboard-panel dashboard-panel-lg">
          <h3></h3>
          <div class="data-item">
            <span class="data-label"></span>
            <span class="data-value"></span>
          </div>
          <div class="data-item">
            <span class="data-label"></span>
            <span class="data-value highlight"></span>
          </div>
        </div>
        <div class="dashboard-panel dashboard-panel-lg">
          <h3></h3>
          <div class="data-item">
            <span class="data-label"></span>
            <span class="data-value highlight"></span>
          </div>
          <div class="data-item">
            <span class="data-label"></span>
            <span class="data-value"></span>
          </div>
          <div class="data-item">
            <span class="data-label"></span>
            <span class="data-value highlight"></span>
          </div>
        </div>
      </div>
      <div class="dashboard-panel dashboard-panel-xl">
        
      </div>
    </div>
</template>

<style scoped>
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-left: 0.5rem;
  height: 100%;
  justify-content: space-between;
}

.dashboard-panel-row {
  display: flex;
  gap: 1.2rem;
  height: 38%;
}

.dashboard-panel {
  /* Efecto glass y fondo */
  background: rgba(40, 42, 65, 0.7);
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(90,107,255,0.08);
  padding: 1.1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
}

.dashboard-panel-lg {
  flex: 1;
  height: 100%;
  min-height: 0;
}

.dashboard-panel-xl {
  height: 48%;
  flex: 1;
  width: 100%;
  min-height: 0;
}

.data-item {
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
}

.data-label {
  font-size: 1rem;
  color: #aaa;
  font-weight: 400;
}

.data-value {
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
}
</style>