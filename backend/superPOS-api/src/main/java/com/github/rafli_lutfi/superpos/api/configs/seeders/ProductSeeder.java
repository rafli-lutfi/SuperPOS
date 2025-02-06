package com.github.rafli_lutfi.superpos.api.configs.seeders;

import com.github.rafli_lutfi.superpos.api.entities.*;
import com.github.rafli_lutfi.superpos.api.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProductSeeder {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Transactional
    public void generateProducts() {
        Category makanan1 = createOrGetCategory("makanan segar");
        Category makanan2 = createOrGetCategory("makanan olahan dan kemasan");
        Category minuman = createOrGetCategory("minuman");
        Category barangRumahTangga = createOrGetCategory("barang rumah tangga");
        Category peralatanElektronik = createOrGetCategory("peralatan elektronik");
        Category alatTulisDanPerlengkapanKantor = createOrGetCategory("alat tulis dan perlengkapan kantor");

        createOrGetProduct("Mie Instant Indomie Goreng", makanan2, 300, 2500.0, "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/8/19/7096d9d4-908a-41fb-8854-be718e33b651.png");
        createOrGetProduct("Air Mineral Le Mineral 600ml", minuman, 500, 3000.0, "https://images.tokopedia.net/img/cache/900/VqbcmM/2020/10/16/1c0b1d99-e891-4a9c-a82e-1ee499677fc9.jpg");
        createOrGetProduct("Pembersih Lantai Super Pell 770ml", barangRumahTangga, 100, 14500.0, "https://images.tokopedia.net/img/cache/900/product-1/2019/10/19/26743791/26743791_ed8235bd-04c0-49be-bda4-eff6e7cdf6a8_500_500");
        createOrGetProduct("Baterai AA Alkaline", peralatanElektronik, 150, 8000.0, "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/7/1/dc0cdc77-174c-4cf3-8ee1-f8c16eafa050.jpg");
        createOrGetProduct("Bolpen Standard Isi 10", alatTulisDanPerlengkapanKantor, 200, 9900.0, "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/5/1/24f5ee9e-8668-43b4-94df-e7032e2dbae3.jpg");
        createOrGetProduct("Roti Tawar Sari Roti Jumbo", makanan1, 200, 17000.0, "https://images.tokopedia.net/img/cache/900/hDjmkQ/2022/12/19/7b257726-51c1-4d76-9175-1de429e07fc6.jpg");
        createOrGetProduct("Susu Ultra Milk Coklat 250ml", minuman, 350, 6000.0, "https://images.tokopedia.net/img/cache/900/hDjmkQ/2023/1/3/2baa1f6a-e706-45f2-a3c1-33344f709b4e.jpg");
        createOrGetProduct("Sabun Mandi Lifebuoy 100gr", barangRumahTangga, 400, 4500.0, "https://images.tokopedia.net/img/cache/900/VqbcmM/2025/1/22/38e62f76-ecbc-4848-a583-a575355abda0.jpg");
        createOrGetProduct("Lampu LED Philips 12W", peralatanElektronik, 150, 25000.0, "https://images.tokopedia.net/img/cache/900/product-1/2019/9/18/25840771/25840771_4e948112-4177-4cea-9675-5a49cd30fa36_400_400");
        createOrGetProduct("Kertas A4 80gsm isi 500 lembar", alatTulisDanPerlengkapanKantor, 100, 50000.0, "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/8/25/f8f0be41-fbf8-45d2-8435-be4313242db0.jpg");
        createOrGetProduct("Kerupuk Udang Finna 200gr", makanan2, 250, 15000.0, "https://images.tokopedia.net/img/cache/900/hDjmkQ/2022/12/16/ee92ee88-6088-44d8-b182-cd77db8f8736.jpg");
        createOrGetProduct("Minuman Soda Coca-cola 1L", minuman, 300, 12000.0, "https://images.tokopedia.net/img/cache/900/hDjmkQ/2024/8/28/91ba9b59-f7f7-4179-9ec9-e98a8dd5dcb9.jpg");
        createOrGetProduct("Pel Lantai Super Mop", barangRumahTangga, 50, 85000.0, "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/10/11/14015429-bda8-433d-a11c-22f5a064e672.png");
        createOrGetProduct("Powerbank Xiaomi 10000mAh", peralatanElektronik, 80, 150000.0, "https://images.tokopedia.net/img/cache/1200/cNAZMf/2024/8/19/854f8f63-485a-4cf8-9296-08557ccc7a44.jpg");
        createOrGetProduct("Spidol Whiteboard Snowman isi 12", alatTulisDanPerlengkapanKantor, 120, 45000.0, "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/1/26/912589aa-b5ff-4329-ad7c-937d8e5f85b2.jpg");

    }

    private Category createOrGetCategory(String categoryName) {
        return categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    log.info("creating category {}", categoryName);
                    return categoryRepository.save(Category.builder().name(categoryName).build());
                });
    }

    private void createOrGetProduct(
            String productName,
            Category category,
            Integer stock,
            Double price,
            String imageUrl
    ) {
       productRepository.findByNameIgnoreCase(productName)
                .orElseGet(() -> {
                    log.info("creating product {}", productName);

                    return productRepository.save(Product.builder()
                            .name(productName)
                            .category(category)
                            .stock(stock)
                            .price(price)
                            .imageUrl(imageUrl)
                            .build()
                    );
                });
    }
}
