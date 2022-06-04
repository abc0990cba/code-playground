SYS_EXIT 	equ 1
SYS_READ 	equ 3
SYS_WRITE	equ 4
STDOUT		equ 1
STDIN		   equ 2

section	.text
	global _start                        ;must be declared for using gcc
	
_start:                                 ;tell linker entry point
    ;user input prompt 
    mov eax, SYS_WRITE                  ;system call number (sys_write)
    mov ebx, STDOUT                     ;file descriptor (stdout)
    mov ecx, userMsg                    ;prompt message
    mov edx, lenUserMsg                 ;prompt message length
    int 80h                             ;call kernel

    ;read user data
    mov eax, SYS_READ                   ;system call number (sys_read)
    mov ebx, STDIN                      ;file descriptor (stdin)
    mov ecx, num                        ;read user number
    mov edx, msgLenBytes                ;length of information bytes
    int 80h                             ;call kernel

    ;output message 'You have entered: '
    mov eax, SYS_WRITE                  ;system call number (sys_write)
    mov ebx, STDOUT                     ;file descriptor (stdout)
    mov ecx, dispMsg                    ;message to display 
    mov edx, lenDispMsg                 ;message to display length
    int 80h                             ;call kernel
   
    ;output user number
    mov eax, SYS_WRITE                  ;system call number (sys_write)
    mov ebx, STDOUT                     ;file descriptor (stdout)
    mov ecx, num                        ;num to display 
    mov edx, msgLenBytes                ;num to display length in bytes
    int 80h                             ;call kernel

    mov	eax, SYS_EXIT	                ;system call number (sys_exit)
	 int	0x80                           ;call kernel

section .data                           ;data segment 
   userMsg db 'Please enter a number: ' ;prompt message 
   lenUserMsg equ $-userMsg             ;prompt message length
   dispMsg db 'You have entered: '      ;displayed message
   lenDispMsg equ $-dispMsg             ;displayed message length    
   msgLenBytes equ 5

section .bss                            ;uninitialized data segment
   num resb msgLenBytes                 ;reserves 5 bytes