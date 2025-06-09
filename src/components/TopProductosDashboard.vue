<script setup>
import { computed } from 'vue';
const props = defineProps({
  productos: Array
});

const productosOrdenados = computed(() => {
  return Object.entries(props.productos)
    .sort((a, b) => b[1].ventas - a[1].ventas);
});


</script>

<template>
  <div class="top-productos-vertical">
    <h2>Top 5 Produtos Máis Vendidos</h2>
    <ul class="lista-productos">
      <li v-for="([etiqueta, producto], index) in productosOrdenados" :key="etiqueta" class="item-producto">
        <span class="ranking-numero">#{{ index + 1 }}</span>
        <img :src="producto.img_link" alt="Imagen" class="producto-imagen" />
        <div class="producto-detalles">
          <h3>{{ producto.nombre }}</h3>
          <p><strong>Etiqueta:</strong> {{ etiqueta }}</p>
          <p class="ventas">🛒 {{ producto.ventas }} vendas</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.top-productos-vertical {
  padding: 40px;
  max-width: 1000px;
  margin: auto;
  background-color: var(--color-background);
  border-radius: 16px;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  color: var(--color-accent-blue);
}

.lista-productos {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item-producto {
  display: flex;
  align-items: center;
  background-color: var(--color-background-secondary);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  transition: transform 0.2s;
}

.item-producto:hover {
  transform: scale(1.02);
}

.ranking-numero {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-accent-blue);
  margin-right: 20px;
  width: 40px;
  text-align: center;
}

.producto-imagen {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 24px;
}

.producto-detalles {
  flex: 1;
}

.producto-detalles h3 {
  font-size: 1.5rem;
  margin-bottom: 6px;
}

.producto-detalles p {
  font-size: 1.1rem;
  margin: 4px 0;
}

.ventas {
  font-weight: bold;
  color: var(--color-accent-blue);
}

.item-producto:first-of-type {
  background: var(--color-background);
  border: 2px solid var(--color-accent-blue);
  box-shadow: 0 0 20px var(--color-accent-blue);
}

.item-producto {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>