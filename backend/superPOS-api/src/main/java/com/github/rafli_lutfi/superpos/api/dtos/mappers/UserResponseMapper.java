package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.responses.LoginResponseDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.UserResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.User;

public class UserResponseMapper {
    public static LoginResponseDTO toLoginResponseDTO(String token, User user) {
        LoginResponseDTO responseDTO = new LoginResponseDTO();
        responseDTO.setToken(token);
        responseDTO.setUser(toUserResponseDTO(user));
        return responseDTO;
    }

    public static UserResponseDTO toUserResponseDTO(User user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(user.getId());
        userResponseDTO.setUsername(user.getName());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setRole(user.getRole().name());
        return userResponseDTO;
    }
}
