package com.github.rafli_lutfi.superpos.api.configs.seeders;

import com.github.rafli_lutfi.superpos.api.entities.Role;
import com.github.rafli_lutfi.superpos.api.entities.User;
import com.github.rafli_lutfi.superpos.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserSeeder {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void generateUser() {
        userRepository.findByEmail("admin@prodemy.com").orElseGet(
                () -> {
                    log.info("Creating admin user");

                    User user = new User();
                    user.setUsername("admin");
                    user.setEmail("admin@prodemy.com");
                    user.setPassword(passwordEncoder.encode("admin"));
                    user.setRole(Role.ADMIN);
                    return userRepository.save(user);
                }
        );
    }
}
