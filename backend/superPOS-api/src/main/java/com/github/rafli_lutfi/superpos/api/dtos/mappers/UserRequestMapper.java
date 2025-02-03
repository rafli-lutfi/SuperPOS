package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.requests.LoginRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.requests.RegisterRequestDTO;
import com.github.rafli_lutfi.superpos.api.entities.User;

public class UserRequestMapper {
    public static User fromRegisterRequestDTO(RegisterRequestDTO requestDTO) {
        User user = new User();

        if (!requestDTO.getPassword().equals(requestDTO.getConfirmPassword())){
            throw new IllegalArgumentException("mismatched password and confirm password");
        }

        user.setUsername(requestDTO.getUsername());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());

        return user;
    }

    public static User fromLoginRequestDTO(LoginRequestDTO requestDTO) {
        User user = new User();
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());

        return user;
    }
}
