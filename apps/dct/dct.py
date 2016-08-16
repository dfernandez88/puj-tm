# -*- coding: cp1252 -*-
import math

#Imagen original
Fxy = [[52,55,61,66,70,61,64,73],
          [63,59,55,90,109,85,69,72],
          [62,59,68,113,144,104,66,73],
          [63,58,71,122,154,106,70,69],
          [67,61,68,104,126,88,68,70],
          [79,65,60,70,77,68,58,75],
          [85,71,64,59,55,61,65,83],
          [87,79,69,68,65,76,78,94]]

#Dimensiones de la imagen
N = len(Fxy)
M = len(Fxy[0])

#Matriz de cuantificacion
Q = [[16,11,10,16,24,40,51,61],
     [12,12,14,19,26,58,60,55],
     [14,13,16,24,40,57,69,56],
     [14,17,22,29,51,87,80,62],
     [18,22,37,56,68,109,103,77],
     [24,35,55,64,81,104,113,92],
     [49,64,78,87,103,121,120,101],
     [72,92,95,98,112,100,103,99]]

def printBitmap(F):
    for x in range(0, len(F)):
        print F[x]
    print
        
def printList(l):
    print l
    print
    
def shift(F,b):
    n = int(math.pow(2,b-1))

    for x in range(0, N):
        for y in range(0, M):
            F[x][y] -= n

    return F

def dct(Fxy):
    Tuv = list()
    for u in range(0, N):
        Tuv_row = list()
        for v in range(0, M):
            Tuv_row.append(int(round(coef(Fxy,u,v))))
        Tuv.append(Tuv_row)
    return Tuv

def coef(Fxy,u,v):
    coef = 0
    for x in range(0, N):
        for y in range(0, M):
            val_xy = Fxy[x][y]
            coef += val_xy * g(x,y,u,v)
            #print coef
    return coef

def g(x,y,u,v):
   return alpha_u(u) * alpha_v(v) * math.cos((2*x+1)*u*math.pi/(2*N)) * math.cos((2*y+1)*v*math.pi/(2*M))

def alpha_u(u):
    if u == 0:
        return math.sqrt(1.0/N)
    else:
        return math.sqrt(2.0/N)

def alpha_v(v):
    if v == 0:
        return math.sqrt(1.0/M)
    else:
        return math.sqrt(2.0/M)

def quantize(T, Q):
    for u in range(0, N):
        for v in range(0, M):
            T[u][v] /= Q[u][v] * 1.0
            T[u][v] = int(round(T[u][v]))
    return T

#Hacer funcion para decuantificar
def dequantize(T, Q):
    return T

#Hacer transformada inversa del coseno
def idct(T):
    F = list()
    return F

#Funcion auxiliar para calcular para hacer operacioned de la idct
def icoef(T,x,y):
    icoef = 0
    return icoef

#Complemento a dos invertido
def shift_inv(F,b):
    return F

def zig_zag(F):
    l = list()

    i = 1
    j = -1

    N = len(F) - 1
    M = len(F[0]) - 1
    c = (N+1) * (M+1)

    diag = 1 #1: /`    2:  ./
    while c > 0:
        c -= 1
        
        if diag == 1:
            i -= 1
            j += 1

            if j > M:
                j -= 1
                i += 2
                diag = 2
            elif i < 0:
                i += 1
                diag = 2

        elif diag == 2:
            i += 1
            j -= 1

            if i > N:
                i -= 1
                j += 2

                diag = 1
            elif j < 0:
                j += 1
                diag = 1
                
        #print i,j,diag
        l.append(F[i][j])

    return l
        

#---------------------------------   

print "Imagen Inicial"
printBitmap(Fxy)

Fxy = shift(Fxy,8)
print "shift"
printBitmap(Fxy)

Tuv = dct(Fxy)
print "DCT"
printBitmap(Tuv)

print "Q"
printBitmap(Q)

Tuv = quantize(Tuv,Q)
print "Cuantificacion"
printBitmap(Tuv)

Tuv_zig_zag = zig_zag(Tuv)
print "ZIG-ZAG scan"
printList(Tuv_zig_zag)

decTuv = dequantize(Tuv,Q)
print "Decuantificacion"
printBitmap(decTuv)

F2xy = idct(Tuv)
print "IDCT"
printBitmap(F2xy)

F2xy = shift_inv(F2xy,8)
print "Shift inv"
printBitmap(F2xy)

#Test de funcion Zig-Zag
#l = [[1,2],[3,4]]
#l = [[1,2,3],[4,5,6],[7,8,9]]
#l = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
#printBitmap(l)
#lz = zig_zag(l)
#print lz
