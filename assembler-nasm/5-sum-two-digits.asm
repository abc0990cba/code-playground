SYS_EXIT 	equ 1
SYS_WRITE	equ 4
STDOUT		equ 1

section	.text
   global _start
	
_start: 
   mov	eax,'3'
   sub  eax, '0'      ;sub ASCII '0' to convert in decimal 
	
   mov 	ebx, '4'
   sub  ebx, '0'      ;sub ASCII '0' to convert in decimal 

   add 	eax, ebx
   add	eax, '0'      ;add '0' to convert sum from decimal system in ASCII
	
   mov 	[sum], eax

   mov	ecx, msg	
   mov	edx, len
   mov	ebx, STDOUT
   mov	eax, SYS_WRITE
   int	0x80	
	
   mov	ecx, sum
   mov	edx, 1
   mov	ebx, STDOUT
   mov	eax, SYS_WRITE
   int	0x80	
	
exit:    
   mov eax, SYS_EXIT   
   int 0x80
	
section .data
   msg db "The sum is:", 0xA,0xD 
   len equ $ - msg   
   segment .bss
   sum resb 1