import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { seedDemoData } from "@/features/companies/services/companyService";
import { getApiErrorMessage } from "@/shared/api";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { DeleteProductDialog } from "../components/DeleteProductDialog";
import { ProductForm } from "../components/ProductForm";
import { ProductsHeader } from "../components/ProductsHeader";
import { ProductsSummaryCards } from "../components/ProductsSummaryCards";
import { ProductsTable } from "../components/ProductsTable";
import type { ProductFormData } from "../schemas/productSchema";
import {
  listCategories,
  type ApiCategory,
} from "../services/categoriesService";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../services/productsService";
import type { Product, ProductSummaryCardData } from "../types/products.types";
import { mapApiProductToProduct } from "../utils/productMappers";

export function ProductsPage() {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        await seedDemoData().catch(() => undefined);
        const [productsPage, categoriesPage] = await Promise.all([
          listProducts(),
          listCategories(),
        ]);
        if (!cancelled) {
          setProducts(productsPage.content.map(mapApiProductToProduct));
          setCategories(categoriesPage.content);
        }
      } catch (err) {
        if (!cancelled) {
          setError(getApiErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const summaryCards = useMemo<ProductSummaryCardData[]>(() => {
    const active = products.filter((product) => product.status === "active").length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const inventoryValue = products.reduce(
      (sum, product) => sum + product.salePrice * product.stock,
      0,
    );
    return [
      {
        id: "registered",
        label: "Productos registrados",
        value: String(products.length),
        accent: "primary",
        helper: "Total en catálogo",
      },
      {
        id: "active",
        label: "Activos",
        value: String(active),
        accent: "success",
        helper: "Disponibles para venta",
      },
      {
        id: "total-stock",
        label: "Stock total",
        value: String(totalStock),
        accent: "warning",
        helper: "Unidades",
      },
      {
        id: "inventory-value",
        label: "Valor inventario",
        value: formatCurrencyCOP(inventoryValue),
        accent: "info",
        helper: "A precio de venta",
      },
    ];
  }, [products]);

  const resolveCategoryId = (categoryName: string) => {
    const match = categories.find(
      (category) =>
        category.name.toLowerCase() === categoryName.trim().toLowerCase(),
    );
    return match?.id ?? categories[0]?.id;
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSubmitSuccess = async (data: ProductFormData) => {
    const categoryId = resolveCategoryId(data.category);
    if (!categoryId) {
      setError("No hay categorías disponibles para crear el producto");
      return;
    }

    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, {
          name: data.name.trim(),
          description: data.description.trim() || undefined,
          sku: editingProduct.sku || undefined,
          price: Number(data.salePrice),
          stock: Number(data.stock),
          categoryId,
          active: editingProduct.status === "active",
        });
        setProducts((current) =>
          current.map((product) =>
            product.id === editingProduct.id
              ? mapApiProductToProduct(updated)
              : product,
          ),
        );
      } else {
        const created = await createProduct({
          name: data.name.trim(),
          description: data.description.trim() || undefined,
          price: Number(data.salePrice),
          stock: Number(data.stock),
          categoryId,
        });
        setProducts((current) => [mapApiProductToProduct(created), ...current]);
      }
      closeForm();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    try {
      await deleteProduct(productToDelete.id);
      setProducts((current) =>
        current.filter((product) => product.id !== productToDelete.id),
      );

      if (editingProduct?.id === productToDelete.id) {
        closeForm();
      }

      setProductToDelete(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const form = isFormOpen ? (
    <ProductForm
      product={editingProduct}
      onCancel={closeForm}
      onSubmitSuccess={handleSubmitSuccess}
    />
  ) : null;

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pb: 2,
      }}
    >
      <ProductsHeader
        search={search}
        onSearchChange={setSearch}
        onNewProduct={openCreateForm}
      />
      <ProductsSummaryCards cards={summaryCards} />

      {error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : null}
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Cargando productos…
        </Typography>
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: isFormOpen ? "minmax(0, 1fr) 360px" : "1fr",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        <ProductsTable
          products={products}
          search={search}
          onEdit={openEditForm}
          onDelete={setProductToDelete}
        />

        {isFormOpen && !isCompact && form}
      </Box>

      <Drawer
        anchor="right"
        open={isFormOpen && isCompact}
        onClose={closeForm}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 400 },
              p: 0,
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        <Box sx={{ p: 2, height: "100%" }}>{form}</Box>
      </Drawer>

      <DeleteProductDialog
        product={productToDelete}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
