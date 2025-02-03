package com.github.rafli_lutfi.superpos.api.services;

import com.github.rafli_lutfi.superpos.api.entities.Role;
import com.github.rafli_lutfi.superpos.api.entities.User;
import com.github.rafli_lutfi.superpos.api.repository.UserRepository;
import com.github.rafli_lutfi.superpos.api.utils.customException.RecordAlreadyExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public Map<String, Object> Login(User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        User authenticatedUser = (User) authentication.getPrincipal();
        String token = jwtService.generateToken(authenticatedUser);

        Map<String, Object> result = new HashMap<>();
        result.put("token", token);
        result.put("user", authenticatedUser);

        return result;
    }

    public void register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RecordAlreadyExistException("User with this email already exists");
        }

        if (userRepository.findByUsername(user.getName()).isPresent()) {
            throw new RecordAlreadyExistException("User with this username already exists");
        }

        user.setRole(Role.ADMIN);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
