package com.github.rafli_lutfi.superpos.api.dtos.requests;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateTransactionRequestDTO {
    private List<CreateTransactionDetailRequestDTO> details;
}
