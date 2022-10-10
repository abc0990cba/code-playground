SYS_EXIT 	equ 1
SYS_WRITE	equ 4
STDOUT		equ 1

section	.text
	global _start                   ;must be declared for using gcc
	
_start:                             ;linker entry point
    mov eax, SYS_WRITE              ;system call number (sys_write)
    mov ebx, STDOUT                 ;file descriptor (stdout)
    mov edx, len                    ;message length
    mov ecx, name                   ;message to display
    int 80h                         ;call kernel

    mov [name], dword 'Kent'        ;change 'John Lee' -> 'Kent Lee'

    mov eax, SYS_WRITE              ;system call number (sys_write)
    mov ebx, STDOUT                 ;file descriptor (stdout)
    mov edx, len                    ;message length
    mov ecx, name                   ;message to display
    int 80h                         ;call kernel

    mov	eax, SYS_EXIT	            ;system call number (sys_exit)
	int	0x80                        ;call kernel

section .data
name db 'John Lee '
len	equ   $ - name	                ;length of string