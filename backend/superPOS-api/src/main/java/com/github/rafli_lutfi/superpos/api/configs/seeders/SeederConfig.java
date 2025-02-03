package com.github.rafli_lutfi.superpos.api.configs.seeders;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SeederConfig {
    private final ProductSeeder productSeeder;
    private final UserSeeder userSeeder;

    @PostConstruct
    @Transactional
    public void seedDatabase() {
        productSeeder.generateProducts();
        userSeeder.generateUser();
    }
}
