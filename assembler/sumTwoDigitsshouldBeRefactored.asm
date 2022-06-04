SYS_EXIT 	equ 1
SYS_READ 	equ 3
SYS_WRITE	equ 4
STDOUT		equ 1
STDIN		equ 2

segment .data
    msg1 db "Enter a first digit: ", 0xA, 0xD
    len1 equ $-msg1

    msg2 db "Enter a second digit: ", 0xA, 0xD
    len2 equ $-msg2

    msg3 db "The sum is: "
    len3 equ $-msg3

    digitSize equ 2
    resultSize equ 2

segment .bss
    num1 resb digitSize
    num2 resb digitSize
    result resb resultSize

section .text
    global _start

_start:
   mov eax, SYS_WRITE
   mov ebx, STDOUT
   mov ecx, msg1
   mov edx, len1
   int 0x80
 
   mov eax, SYS_READ 
   mov ebx, STDIN  
   mov ecx, num1 
   mov edx, digitSize
   int 0x80            
 
   mov eax, SYS_WRITE        
   mov ebx, STDOUT         
   mov ecx, msg2          
   mov edx, len2         
   int 0x80
 
   mov eax, SYS_READ  
   mov ebx, STDIN  
   mov ecx, num2 
   mov edx, digitSize
   int 0x80        
 
   mov eax, SYS_WRITE         
   mov ebx, STDOUT         
   mov ecx, msg3          
   mov edx, len3         
   int 0x80
 
   ;sub ASCII '0' to convert in decimal 
   mov eax, [num1]
   sub eax, '0'
	
   mov ebx, [num2]
   sub ebx, '0'
 
   add eax, ebx
 
   ;add '0' to convert sum from decimal system in ASCII
   add eax, '0'
 
   ;save sun in res
   mov [result], eax
 
   mov eax, SYS_WRITE        
   mov ebx, STDOUT
   mov ecx, result         
   mov edx, resultSize        
   int 0x80
 
exit:    
   mov eax, SYS_EXIT   
   xor ebx, ebx 
   int 0x80