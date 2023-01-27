# Halal MUI API

> API untuk mencari produk yang terdaftar di MUI

# Endopint

[https://halal-mui.vercel.app/v1/](https://halal-mui.vercel.app//v1/ "Endpoint Halal MUI")

## Cari Produk

* Method

  * **GET**
* Request Query (Pilih salah satu)

  * `product_name` as `string`
  * `produsen_name` as `string`
  * `certificate` as `string`
* Successful Response

```
{
    "error": false,
    "message": "Halal product fetched successfully",
    "data": [
        {
            "product": " Indomie Instant Cup Noodles Vegetable Flavour",
            "certificate": "LPPOM-00060004720799",
            "produsen": "PT. Indofood CBP Sukses Makmur Tbk, Food Ingredient Division",
            "expired": "08 November 2026"
        },
        ...
    ],
    "current_page": 1,
    "next_page": 1,
    "total": 106,
    "total_pages": 11
}
```

* Error Response

```
{
    "error": true,
    "message": "Produk tersebut belum memiliki Ketetapan Halal MUI atau Produk Tidak Dipublish."
}
```

---

by [Jabir Developer](https://youtube.com/@JabirDeveloper/)
